import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public doSpinner = new BehaviorSubject<any>(null);

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
    }
}
}
