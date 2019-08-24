import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebenvironmentComponent } from './webenvironment.component';

describe('WebenvironmentComponent', () => {
  let component: WebenvironmentComponent;
  let fixture: ComponentFixture<WebenvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebenvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebenvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
