import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobpostComponent } from './edit-jobpost.component';

describe('EditJobpostComponent', () => {
  let component: EditJobpostComponent;
  let fixture: ComponentFixture<EditJobpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJobpostComponent]
    });
    fixture = TestBed.createComponent(EditJobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
