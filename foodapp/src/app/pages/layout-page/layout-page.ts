import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Popup } from "../../components/popup/popup";

@Component({
  selector: 'app-layout-page',
  imports: [RouterOutlet, Header, Popup],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.scss',
})
export class LayoutPage implements OnInit{
  isPopup : boolean = false;
  user : User |null = null;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        if(!this.user?.nbPerson){
          this.isPopup = true
        }
      }
    )
  }

  close(closing : boolean){
    this.isPopup = closing
  }
}
