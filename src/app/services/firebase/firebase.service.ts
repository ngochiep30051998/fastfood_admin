import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { IMenu } from '../../interfaces/menu.interfaces';
import { IProduct } from '../../interfaces/products.interface';
import { HelperService } from '../helper/helper.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase,
    private helperService: HelperService
  ) { }

  getRef(ref) {
    return this.db.list(ref);
  }

  getCategories() {
    return this.db.list('/categories').snapshotChanges().pipe(map((snap: any) => {

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
}
