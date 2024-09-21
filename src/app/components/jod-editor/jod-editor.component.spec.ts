import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JodEditorComponent } from './jod-editor.component';

describe('JodEditorComponent', () => {
  let component: JodEditorComponent;
  let fixture: ComponentFixture<JodEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JodEditorComponent]
    });
    fixture = TestBed.createComponent(JodEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
