import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDocTranslateComponent } from './google-doc-translate.component';

describe('GoogleDocTranslateComponent', () => {
  let component: GoogleDocTranslateComponent;
  let fixture: ComponentFixture<GoogleDocTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleDocTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleDocTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
