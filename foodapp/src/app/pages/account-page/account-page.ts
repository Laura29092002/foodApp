import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  imports: [],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage implements OnInit {
  user: User | null = null; 

  constructor(private userService : UserService, private router : Router){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
      }
    );
  }

  deconnexion(){
    this.userService.logout();
    this.router.navigate(['/login']);

  }

}
