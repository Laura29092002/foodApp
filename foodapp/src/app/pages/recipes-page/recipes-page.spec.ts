import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesPage } from './recipes-page';

describe('RecipesPage', () => {
  let component: RecipesPage;
  let fixture: ComponentFixture<RecipesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
