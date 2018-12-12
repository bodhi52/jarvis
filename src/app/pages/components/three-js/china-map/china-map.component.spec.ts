import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinaMapComponent } from './china-map.component';

describe('ChinaMapComponent', () => {
  let component: ChinaMapComponent;
  let fixture: ComponentFixture<ChinaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinaMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
