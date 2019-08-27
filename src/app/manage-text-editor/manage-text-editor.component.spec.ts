import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTextEditorComponent } from './manage-text-editor.component';

describe('ManageTextEditorComponent', () => {
  let component: ManageTextEditorComponent;
  let fixture: ComponentFixture<ManageTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
