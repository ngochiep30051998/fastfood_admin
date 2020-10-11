import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingInsideBtnComponent } from './loading-inside-btn.component';

describe('LoadingInsideBtnComponent', () => {
  let component: LoadingInsideBtnComponent;
  let fixture: ComponentFixture<LoadingInsideBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingInsideBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingInsideBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
