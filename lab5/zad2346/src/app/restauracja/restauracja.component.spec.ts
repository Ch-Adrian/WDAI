import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauracjaComponent } from './restauracja.component';

describe('RestauracjaComponent', () => {
  let component: RestauracjaComponent;
  let fixture: ComponentFixture<RestauracjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauracjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauracjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
