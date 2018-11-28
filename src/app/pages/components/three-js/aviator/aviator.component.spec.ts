import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviatorComponent } from './aviator.component';

describe('AviatorComponent', () => {
  let component: AviatorComponent;
  let fixture: ComponentFixture<AviatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
