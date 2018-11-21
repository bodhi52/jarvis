import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionalSceneComponent } from './three-dimensional-scene.component';

describe('ThreeDimensionalSceneComponent', () => {
  let component: ThreeDimensionalSceneComponent;
  let fixture: ComponentFixture<ThreeDimensionalSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDimensionalSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDimensionalSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
