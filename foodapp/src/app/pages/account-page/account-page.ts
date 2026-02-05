import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';
import { RegimeService } from '../../services/regime/regime';
import { Popup } from "../../components/popup/popup";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-account-page',
  imports: [Popup, UpperCasePipe],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage implements OnInit {
  user: User | null = null; 
  regimeName : string = "";
  isEditing : boolean = false;

  constructor(private userService : UserService, private router : Router, private regimeService: RegimeService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        if(this.user?.regimeId){
          this.regimeService.getRegimeById(this.user.regimeId).subscribe(
            re => {
              this.regimeName = re.name;
            }
          )

        }
        
      }
    );
  }

  counter(n: number| undefined): any[] {
    return Array(n);
  }

  modify(closing : boolean){
    this.isEditing = closing;
  }

  

  deconnexion(){
    this.userService.logout();
    this.router.navigate(['/login']);

  }

}
