import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepsToRecipe } from './add-steps-to-recipe';

describe('AddStepsToRecipe', () => {
  let component: AddStepsToRecipe;
  let fixture: ComponentFixture<AddStepsToRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStepsToRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStepsToRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
