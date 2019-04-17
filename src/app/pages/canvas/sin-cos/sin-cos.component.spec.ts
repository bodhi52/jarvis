import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinCosComponent } from './sin-cos.component';

describe('SinCosComponent', () => {
  let component: SinCosComponent;
  let fixture: ComponentFixture<SinCosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinCosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
