import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigRecipeCard } from './big-recipe-card';

describe('BigRecipeCard', () => {
  let component: BigRecipeCard;
  let fixture: ComponentFixture<BigRecipeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigRecipeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigRecipeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
