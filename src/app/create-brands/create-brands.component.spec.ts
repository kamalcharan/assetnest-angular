import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrandsComponent } from './create-brands.component';

describe('CreateBrandsComponent', () => {
  let component: CreateBrandsComponent;
  let fixture: ComponentFixture<CreateBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
