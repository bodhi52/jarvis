import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxpayComponent } from './wxpay.component';

describe('WxpayComponent', () => {
  let component: WxpayComponent;
  let fixture: ComponentFixture<WxpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
