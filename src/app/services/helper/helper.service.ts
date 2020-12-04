import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public doSpinner = new Subject<any>();

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  markFormGroupTouched(formGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  showLoading() {
    this.doSpinner.next(true);
  }
  hideLoading() {
    this.doSpinner.next(false);
  }

  object2ArrMerge(obj) {
    return _.map(obj, (value, key) => ({ key, ...value }));
  }

  object2Arr(obj) {
    return _.map(obj, (value, key) => ({ key, value }));
  }

  snap2Object(snap: SnapshotAction<any>) {
    try {
      const value = snap.payload.val();
      return { key: snap.payload.key, ...value };
    } catch (e) {
      console.log(e);
      return snap;
    }
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  scrollToError(): void {
    const firstElementWithError = document.querySelector('.mat-form-field-invalid ');
    this.scrollTo(firstElementWithError);
  }

  MustLower(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustLower) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value < matchingControl.value) {
        matchingControl.setErrors({ mustLower: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  generateRandomUID(length: number = 20) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  getWeekInMonth() {
    const firstFeb2014 = moment(new Date());
    const day = firstFeb2014.day();
    const nthOfMoth = Math.ceil(firstFeb2014.date() / 7);
    console.log(day, nthOfMoth);
  }
  getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('DD/MM/YYYY'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  isSameDate(date1, date2) {
      return moment(date1).isSame(date2);
  }
}
