import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { IBill } from '../../interfaces/bill.interface';
import { IMenu } from '../../interfaces/menu.interfaces';
import { IProduct } from '../../interfaces/products.interface';
import { IUser } from '../../interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { HelperService } from '../helper/helper.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase,
    private helperService: HelperService,
    public storage: AngularFireStorage,
    public authService: AuthService,
  ) { }

  getRef(ref) {
    return this.db.list(ref);
  }

  getCategories() {
    return this.db.list('/categories',ref=>ref.orderByChild('date')).snapshotChanges().pipe(map((snap: any) => {
      return snap = snap.map((x: any) => {

        const data = {
          key: x.payload.key,
          categoryName: x.payload.val().categoryName,
          products: this.helperService.object2ArrMerge(x.payload.val().products),
        };
        data.products = data.products.map(p => {
          p.photos = this.helperService.object2Arr(p.photos);
          p.catId = x.payload.key;
          p.catName = x.payload.val().categoryName;
          return p;
        });
        return data;
      });
    }));
  }

  getProductById(catId, prodId) {
    return new Promise((resolve, reject) => {
      return this.db.object(`categories/${catId}/products/${prodId}`).snapshotChanges().subscribe(res => {
        console.log(res)
        resolve(res.payload.val());
      }, err => {
        reject(err);
      });
    });
  }

  async createMultiValuesMenu(menu: IMenu) {
    // const lunch = this.db.object(`menus/${menu.id}/lunch`);
    // const drinks = this.db.object(`menus/${menu.id}/drinks`);
    try {
      if (menu.breakfast) {
        for (const item of menu.breakfast) {
          await this.db.object(`menus/${menu.id}/breakfast/${item.id}`).set(item);
        }
      }
      if (menu.lunch) {
        for (const item of menu.lunch) {
          await this.db.object(`menus/${menu.id}/lunch/${item.id}`).set(item);
        }
      }
      if (menu.drinks) {
        for (const item of menu.drinks) {
          await this.db.object(`menus/${menu.id}/drinks/${item.id}`).set(item);
        }
      }
      return true;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async createMenu(menuId: string, tab: string, product: IProduct) {
    try {
      const exits = await this.checkIsExistProduct(menuId, tab, product);
      if (!exits) {
        return this.db.object(`menus/${menuId}/${tab}/${product.id}`).set(product);
      } else {
        throw { message: 'Sản phẩm đã tồn tại' };
      }
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  getMenu(id) {
    return this.db.object(`/menus/${id}`).snapshotChanges().pipe(
      map(snap => {
        const ob = this.helperService.snap2Object(snap);
        for (const key in ob) {
          if (ob.hasOwnProperty(key) && key !== 'key') {
            ob[key] = this.helperService.object2ArrMerge(ob[key])
            ob[key] = ob[key].map(p => {
              p.photos = this.helperService.object2Arr(p.photos);
              return p;
            });
          }
        }
        return ob;
      })
    );
  }

  getCatById(catId) {
    return new Promise((resolve, reject) => {
      return this.db.object(`categories/${catId}`).snapshotChanges().subscribe(res => {
        resolve(res.payload.val());
      }, err => {
        reject(err);
      });
    });
  }

  checkIsExistProduct(menuId: string, tab: string, product: IProduct) {
    return new Promise((resolve, reject) => {
      return this.db.object(`menus/${menuId}/${tab}/${product.id}`).valueChanges().subscribe((res) => {
        if (res) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, err => {
        reject(err);
      });
    });
  }

  removeProductInMenu(menuId: string, tab: string, product: IProduct): Promise<any> {
    return this.db.object(`menus/${menuId}/${tab}/${product.id}`).remove();
  }

  updateProductInMenu(menuId: string, tab: string, product: IProduct): Promise<any> {
    return this.db.object(`menus/${menuId}/${tab}/${product.id}`).update(product);
  }

  async createProduct(product: IProduct) {
    try {
      Object.keys(product).forEach(key => product[key] === undefined ? delete product[key] : {});
      return this.db.list(`categories/${product.catId}/products/`).push(product);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async updateProduct(product: IProduct) {
    try {
      Object.keys(product).forEach(key => product[key] === undefined ? delete product[key] : {});
      return this.db.object(`categories/${product.catId}/products/${product.id}`).update(product);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  removeProduct(product: IProduct) {
    try {
      return this.db.object(`categories/${product.catId}/products/${product.id}`).remove();
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
  removePhotoFromProduct(product: IProduct, key) {
    try {
      this.db.object(`categories/${product.catId}/products/${product.id}/photos/${key}`).remove();
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  removePhoto(path) {
    return this.storage.storage.refFromURL(path).delete();
  }

  removeChildProduct(product: IProduct, child) {
    this.db.object(`categories/${product.catId}/products/${product.id}/${child}`).remove();
  }

  getBills() {
    return this.db.list(`bills/`,ref=> ref.orderByChild('date')).valueChanges();
  }

  getBillDetail(id) {
    return this.db.object(`bills/${id}`).valueChanges();
  }
  async updateBill(bill: IBill) {
    bill.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    const user: IUser = await this.authService.getCurrentUser();
    const moreInfo: any = await this.getUserInfo(user.uid);
    bill.staff = { ...moreInfo, ...user };
    return this.db.object(`bills/${bill.id}`).update(bill);
  }

  getUserInfo(uId) {
    return new Promise((resolve, reject) => {
      return this.db.object(`userInfo/${uId}`).valueChanges().subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getMenuByDate(date) {
    return this.db.object(`/menus/${date}`).valueChanges();
  }
  copyMenu(date, menu) {
    return this.db.object(`/menus/${date}`).set(menu);
  }

  async checkUpdate(product: IProduct) {
    try {
      return new Promise((resolve, reject) => {
        const snap = this.db.object(`menus/${product.menuId}/${product.meal}/${product.id}`);
        snap.valueChanges().subscribe((p: IProduct) => {
          if (p.amount >= product.amount) {
            resolve({
              billAmount: product.amount,
              currentAmount: p.amount,
              productPath: `menus/${product.menuId}/${product.meal}/${product.id}`
            });
          } else {
            reject({
              message: `Sản phẩm ${product.name} chỉ còn ${p.amount} < ${product.amount}`,
              code: '1'
            });
          }
        }, err => {
          console.log('false-------');
          reject(err);
        });
      });

    } catch (e) {
      console.log(e);
    }
  }

  async updateBillProduct(amount, path) {
    try {
      return this.db.object(path).update(amount);
    } catch (e) {
      console.log(e);
    }
  }

  getRefData(path) {
    return new Promise((resolve, reject) => {
      this.db.object(path).valueChanges().subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  updateRef(ref, data) {
    return this.db.object(ref).update(data);
  }

  getListBill(start, end) {
    return this.db.list('/bills',
      ref => ref.orderByChild('date').startAt(start).endAt(end)
    ).valueChanges();
  }

  removeCat(catId) {
    return this.db.object(`categories/${catId}`).remove();
  }

  createCat(cat) {
    return this.db.list('categories').push(cat).then(res => res);
  }
}
