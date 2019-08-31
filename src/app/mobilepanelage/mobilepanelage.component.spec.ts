import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilepanelageComponent } from './mobilepanelage.component';

describe('MobilepanelageComponent', () => {
  let component: MobilepanelageComponent;
  let fixture: ComponentFixture<MobilepanelageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilepanelageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilepanelageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
