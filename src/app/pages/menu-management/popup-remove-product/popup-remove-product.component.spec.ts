import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRemoveProductComponent } from './popup-remove-product.component';

describe('PopupRemoveProductComponent', () => {
  let component: PopupRemoveProductComponent;
  let fixture: ComponentFixture<PopupRemoveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRemoveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
