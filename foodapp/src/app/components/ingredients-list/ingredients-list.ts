import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';

@Component({
  selector: 'app-ingredients-list',
  imports: [MatCheckboxModule],
  templateUrl: './ingredients-list.html',
  styleUrl: './ingredients-list.scss',
})
export class IngredientsList implements OnInit{
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
