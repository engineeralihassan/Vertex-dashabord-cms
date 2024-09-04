import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderShinnerComponent } from './loader-shinner.component';

describe('LoaderShinnerComponent', () => {
  let component: LoaderShinnerComponent;
  let fixture: ComponentFixture<LoaderShinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderShinnerComponent]
    });
    fixture = TestBed.createComponent(LoaderShinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
