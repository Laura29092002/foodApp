import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecipe } from './daily-recipe';

describe('DailyRecipe', () => {
  let component: DailyRecipe;
  let fixture: ComponentFixture<DailyRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
