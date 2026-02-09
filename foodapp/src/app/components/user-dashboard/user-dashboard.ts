import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/step.model';
import { UserService } from '../../services/user/user';
import { Loader } from "../loader/loader";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBox } from '../confirm-box/confirm-box';

@Component({
  selector: 'app-user-dashboard',
  imports: [Loader],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit{
  users : User[] = [];
  isloading: boolean = false;

  constructor(private userService : UserService, private dialog : MatDialog){}

  ngOnInit(): void {
    this.isloading = true;
    this.userService.getUsers().subscribe(
      data => {
        data.sort((a, b) => a.id - b.id);
        this.users = data;
        this.isloading = false;
      }
    )
  }

  deleteUser(idUser : number, index : number){
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '350px',
      data: {message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userService.deleteUser(idUser).subscribe();
        this.users.splice(index, 1);
        console.log(this.users);
      }
    })
  }

  upgradeUser(user : User, index : number){
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '350px',
      data: {message: `Êtes-vous sûr de vouloir changer le rôle de ${user.firstname}?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(user.role !== "admin"){
          user.role = "admin";
          console.log(user);
          this.userService.updateUser(user).subscribe();
          this.users[index].role = "admin";
        }else{
          user.role = "user";
          this.userService.updateUser(user).subscribe();
          this.users[index].role = "user";
        }
      }
    })
    
    
  }
}
