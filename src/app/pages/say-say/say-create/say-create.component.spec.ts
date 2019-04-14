import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SayCreateComponent } from './say-create.component';

describe('SayCreateComponent', () => {
  let component: SayCreateComponent;
  let fixture: ComponentFixture<SayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
