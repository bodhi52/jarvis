import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerIntervalComponent } from './timer-interval.component';

describe('TimerIntervalComponent', () => {
  let component: TimerIntervalComponent;
  let fixture: ComponentFixture<TimerIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
