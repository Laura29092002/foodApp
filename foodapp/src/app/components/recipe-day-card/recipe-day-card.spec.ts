import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDayCard } from './recipe-day-card';

describe('RecipeDayCard', () => {
  let component: RecipeDayCard;
  let fixture: ComponentFixture<RecipeDayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDayCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDayCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
