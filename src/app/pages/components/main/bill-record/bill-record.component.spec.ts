import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRecordComponent } from './bill-record.component';

describe('BillRecordComponent', () => {
  let component: BillRecordComponent;
  let fixture: ComponentFixture<BillRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
