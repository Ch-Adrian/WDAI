import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyButtonsComponent } from './modify-buttons.component';

describe('ModifyButtonsComponent', () => {
  let component: ModifyButtonsComponent;
  let fixture: ComponentFixture<ModifyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
