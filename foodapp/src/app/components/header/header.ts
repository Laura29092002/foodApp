import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/step.model';
import { UserService } from '../../services/user/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  user : User |null = null;

  constructor(private userService : UserService){
  }

  ngOnInit(){
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
      }
    )
  }

}
