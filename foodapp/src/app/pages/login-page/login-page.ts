import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertBox } from '../../components/alert-box/alert-box';
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  form: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialog : MatDialog){
    this.form = this.fb.group({
      mail: ['', Validators.required],
      mdp: ['', Validators.required]
    })
  }

  login(){
    if(this.form.value.mail && this.form.value.mdp){
        this.userService.isUser(this.form.value.mail, this.form.value.mdp).subscribe(data =>{
        this.user = data;
        if(this.user.mail != null){
          this.userService.login(this.user);
          this.router.navigate(['/home']);
        }else{
          const dialogRef = this.dialog.open(AlertBox,{
            width : '350px',
            data : { message : 'Email ou mot de passe incorecte.'}
          });
        }
      });
    }else{
      const dialogRef = this.dialog.open(AlertBox,{
        width : '350px',
        data : { message : 'Veuillez renseigner un mail et un mot de passe valide'}
      });
    }
    }

  inscription(){
    this.router.navigate(['/inscription']);
  }
    



}
