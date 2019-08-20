import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OminichaneelsComponent } from './ominichaneels.component';

describe('OminichaneelsComponent', () => {
  let component: OminichaneelsComponent;
  let fixture: ComponentFixture<OminichaneelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OminichaneelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OminichaneelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
