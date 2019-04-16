import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLevelComponent } from './basic-level.component';

describe('BasicLevelComponent', () => {
  let component: BasicLevelComponent;
  let fixture: ComponentFixture<BasicLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
