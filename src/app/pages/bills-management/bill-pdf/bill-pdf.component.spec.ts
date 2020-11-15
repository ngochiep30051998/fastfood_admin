import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPdfComponent } from './bill-pdf.component';

describe('BillPdfComponent', () => {
  let component: BillPdfComponent;
  let fixture: ComponentFixture<BillPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
