import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatlogCatagoriesComponent } from './catlog-catagories.component';

describe('CatlogCatagoriesComponent', () => {
  let component: CatlogCatagoriesComponent;
  let fixture: ComponentFixture<CatlogCatagoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatlogCatagoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlogCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
