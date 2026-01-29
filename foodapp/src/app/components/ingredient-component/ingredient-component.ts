import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';

@Component({
  selector: 'app-ingredient-component',
  imports: [],
  templateUrl: './ingredient-component.html',
  styleUrl: './ingredient-component.scss',
})
export class IngredientComponent implements OnInit{
  @Input() ingredient!: Ingredient;
  user : User | null = null;

  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      data =>{
        this.user = data;
        if(this.user?.nbPerson){
          this.ingredient.quantity = this.ingredient.quantity! * this.user.nbPerson;
        }
      }
    )
  }

}
