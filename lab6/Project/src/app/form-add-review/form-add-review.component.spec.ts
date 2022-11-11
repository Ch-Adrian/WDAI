import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddReviewComponent } from './form-add-review.component';

describe('FormAddReviewComponent', () => {
  let component: FormAddReviewComponent;
  let fixture: ComponentFixture<FormAddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
