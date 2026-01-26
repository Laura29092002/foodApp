import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-page',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription-page.html',
  styleUrl: './inscription-page.scss',
})
export class InscriptionPage {
  form: FormGroup;
  newUser!: User;

  constructor(private fb: FormBuilder, private userService : UserService, private router: Router){
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      conf: ['', Validators.required]
    })
  }

  inscription(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    if(this.form.get('mdp') != this.form.get('conf')){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    const user = new User(0, this.form.value.firstname, this.form.value.lastname, this.form.value.mail, "user" ,this.form.value.mdp);
    this.userService.addUser(user).subscribe(data =>{
      this.newUser = data;
      console.log(this.newUser);
      this.router.navigate(['/login']);
    });
    
  }

}
