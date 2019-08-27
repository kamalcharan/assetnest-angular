import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleIntegrationsComponent } from './single-integrations.component';

describe('SingleIntegrationsComponent', () => {
  let component: SingleIntegrationsComponent;
  let fixture: ComponentFixture<SingleIntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleIntegrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
