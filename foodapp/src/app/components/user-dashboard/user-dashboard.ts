import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/step.model';
import { UserService } from '../../services/user/user';
import { Loader } from "../loader/loader";

@Component({
  selector: 'app-user-dashboard',
  imports: [Loader],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit{
  users : User[] = [];
  isloading: boolean = false;

  constructor(private userService : UserService){}

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
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(idUser).subscribe();
      this.users.splice(index, 1);
      console.log(this.users);
    }
  }

  upgradeUser(user : User, index : number){
    if(confirm(`Êtes-vous sûr de vouloir changer le rôle de ${user.firstname}?`)){
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
    
    
  }
}
