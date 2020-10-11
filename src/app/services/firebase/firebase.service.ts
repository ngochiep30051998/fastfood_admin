import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
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
          p.catId =  x.payload.key;
          p.catName = x.payload.val().categoryName;
          return p;
        });
        return data;
      });
    }));
  }
}
