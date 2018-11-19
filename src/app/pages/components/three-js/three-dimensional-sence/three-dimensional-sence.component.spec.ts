import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionalSenceComponent } from './three-dimensional-sence.component';

describe('ThreeDimensionalSenceComponent', () => {
  let component: ThreeDimensionalSenceComponent;
  let fixture: ComponentFixture<ThreeDimensionalSenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDimensionalSenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDimensionalSenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
