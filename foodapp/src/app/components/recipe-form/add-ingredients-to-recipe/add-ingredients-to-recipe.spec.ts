import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientsToRecipe } from './add-ingredients-to-recipe';

describe('AddIngredientsToRecipe', () => {
  let component: AddIngredientsToRecipe;
  let fixture: ComponentFixture<AddIngredientsToRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIngredientsToRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngredientsToRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
