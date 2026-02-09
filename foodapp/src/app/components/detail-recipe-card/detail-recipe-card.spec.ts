import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecipeCard } from './detail-recipe-card';

describe('DetailRecipeCard', () => {
  let component: DetailRecipeCard;
  let fixture: ComponentFixture<DetailRecipeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRecipeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRecipeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
