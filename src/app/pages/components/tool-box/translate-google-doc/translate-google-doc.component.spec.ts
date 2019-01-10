import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateGoogleDocComponent } from './translate-google-doc.component';

describe('TranslateGoogleDocComponent', () => {
  let component: TranslateGoogleDocComponent;
  let fixture: ComponentFixture<TranslateGoogleDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateGoogleDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateGoogleDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
