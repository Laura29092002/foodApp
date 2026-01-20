import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsDashboard } from './ingredients-dashboard';

describe('IngredientsDashboard', () => {
  let component: IngredientsDashboard;
  let fixture: ComponentFixture<IngredientsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
