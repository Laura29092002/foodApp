import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeForm1 } from './recipe-form-1';

describe('RecipeForm1', () => {
  let component: RecipeForm1;
  let fixture: ComponentFixture<RecipeForm1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeForm1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeForm1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
