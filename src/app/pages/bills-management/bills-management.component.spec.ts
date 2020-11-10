import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsManagementComponent } from './bills-management.component';

describe('BillsManagementComponent', () => {
  let component: BillsManagementComponent;
  let fixture: ComponentFixture<BillsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
