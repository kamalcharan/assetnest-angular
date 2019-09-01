import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOminiChannalsComponent } from './single-omini-channals.component';

describe('SingleOminiChannalsComponent', () => {
  let component: SingleOminiChannalsComponent;
  let fixture: ComponentFixture<SingleOminiChannalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOminiChannalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOminiChannalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
