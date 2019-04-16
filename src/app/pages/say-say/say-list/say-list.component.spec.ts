import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SayListComponent } from './say-list.component';

describe('SayListComponent', () => {
  let component: SayListComponent;
  let fixture: ComponentFixture<SayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
