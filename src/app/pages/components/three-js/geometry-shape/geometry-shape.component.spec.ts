import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryShapeComponent } from './geometry-shape.component';

describe('GeometryShapeComponent', () => {
  let component: GeometryShapeComponent;
  let fixture: ComponentFixture<GeometryShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeometryShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
