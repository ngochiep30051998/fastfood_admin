import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToMenuComponent } from './add-product-to-menu.component';

describe('AddProductToMenuComponent', () => {
  let component: AddProductToMenuComponent;
  let fixture: ComponentFixture<AddProductToMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductToMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
