import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MceEditorComponent } from './mce-editor.component';

describe('MceEditorComponent', () => {
  let component: MceEditorComponent;
  let fixture: ComponentFixture<MceEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MceEditorComponent]
    });
    fixture = TestBed.createComponent(MceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
