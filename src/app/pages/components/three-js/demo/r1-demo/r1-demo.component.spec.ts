import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { R1DemoComponent } from './r1-demo.component';

describe('R1DemoComponent', () => {
  let component: R1DemoComponent;
  let fixture: ComponentFixture<R1DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R1DemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R1DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
