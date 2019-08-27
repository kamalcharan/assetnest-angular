import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApikeysComponent } from './view-apikeys.component';

describe('ViewApikeysComponent', () => {
  let component: ViewApikeysComponent;
  let fixture: ComponentFixture<ViewApikeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApikeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApikeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
