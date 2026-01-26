import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  form: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
    this.form = this.fb.group({
      mail: ['', Validators.required],
      mdp: ['', Validators.required]
    })
  }

  login(){
    console.log(this.form.value);
    if(this.form.value.mail && this.form.value.mdp){
        this.userService.isUser(this.form.value.mail, this.form.value.mdp).subscribe(data =>{
        this.user = data;
        console.log(this.user);
        if(this.user.mail != null){
          console.log(this.user);
          this.router.navigate(['/home']);
        }else{
          alert("Email ou mot de passe incorecte");
        }
      });
    }else{
      alert("Veuillez renseigner un mail et un mot de passe valide");
    }
    }

  inscription(){
    this.router.navigate(['/inscription']);
  }
    



}
