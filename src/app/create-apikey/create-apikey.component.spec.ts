import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApikeyComponent } from './create-apikey.component';

describe('CreateApikeyComponent', () => {
  let component: CreateApikeyComponent;
  let fixture: ComponentFixture<CreateApikeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApikeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApikeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
