import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthGeoComponent } from './earth-geo.component';

describe('EarthGeoComponent', () => {
  let component: EarthGeoComponent;
  let fixture: ComponentFixture<EarthGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
