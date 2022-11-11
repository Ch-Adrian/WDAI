import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddDishComponent } from './form-add-dish.component';

describe('FormAddDishComponent', () => {
  let component: FormAddDishComponent;
  let fixture: ComponentFixture<FormAddDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
