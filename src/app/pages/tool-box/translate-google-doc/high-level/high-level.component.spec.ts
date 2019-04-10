import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLevelComponent } from './high-level.component';

describe('HighLevelComponent', () => {
  let component: HighLevelComponent;
  let fixture: ComponentFixture<HighLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
