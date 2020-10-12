import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { IMenu } from '../../interfaces/menu.interfaces';
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
        resolve(res.payload.val());
      }, err => {
        reject(err);
      });
    });
  }

  createMenu(menu: IMenu) {
    const breakfast = this.db.object(`menus/${menu.id}/breakfast`);
    // const lunch = this.db.object(`menus/${menu.id}/lunch`);
    // const drinks = this.db.object(`menus/${menu.id}/drinks`);

    for (const item of menu.breakfast) {
      this.db.object(`menus/${menu.id}/breakfast/${item.id}`).set(item);
    }
  }
}
