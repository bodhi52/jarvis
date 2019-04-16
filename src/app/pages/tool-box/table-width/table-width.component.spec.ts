import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWidthComponent } from './table-width.component';

describe('TableWidthComponent', () => {
  let component: TableWidthComponent;
  let fixture: ComponentFixture<TableWidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
