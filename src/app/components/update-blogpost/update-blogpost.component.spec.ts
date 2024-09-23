import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlogpostComponent } from './update-blogpost.component';

describe('UpdateBlogpostComponent', () => {
  let component: UpdateBlogpostComponent;
  let fixture: ComponentFixture<UpdateBlogpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBlogpostComponent]
    });
    fixture = TestBed.createComponent(UpdateBlogpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
