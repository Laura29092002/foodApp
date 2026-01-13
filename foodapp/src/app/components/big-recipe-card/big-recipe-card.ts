import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-big-recipe-card',
  imports: [],
  templateUrl: './big-recipe-card.html',
  styleUrl: './big-recipe-card.scss',
})
export class BigRecipeCard {
  @Input() recipe!: Recipe;
  @Input() editionMode: boolean = false;
  @Input() selected: boolean = false;

  @Output() select = new EventEmitter<Recipe>();



  constructor(private router : Router) { }

  onClick() {
    if(this.editionMode){
      this.selected = !this.selected;
      this.select.emit(this.recipe);
    }else{
      this.router.navigate(['/recipe', this.recipe.id]);
    }
  }

  
}
