import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inscription-page',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription-page.html',
  styleUrl: './inscription-page.scss',
})
export class InscriptionPage {
  form: FormGroup;
  newUser!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      conf: ['', Validators.required]
    })
  }

  async inscription(){
    if(this.form.invalid){
      confirm('Tous les champs ne sont pas remplis.');
      return;
    }
    
    if(this.form.value.mdp != this.form.value.conf){
      confirm('Veuillez renseigner le même mot de passe dans les deux champs.');
      return;
    }

    try {
      const isExisting = await firstValueFrom(
        this.userService.isExistingUser(this.form.value.mail)
      );
      
      if(isExisting){
        confirm('Utilisateur déjà existant');
        return;
      }
      const user = new User(
        0, 
        this.form.value.firstname, 
        this.form.value.lastname, 
        this.form.value.mail, 
        "user",
        this.form.value.mdp
      );
      
      this.newUser = await firstValueFrom(
        this.userService.addUser(user)
      );
      
      this.router.navigate(['/login']);
      
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      confirm("Une erreur est survenue lors de l'inscription.");
    }
  }

  onCancel(){
    this.router.navigate(['/']);
  }
}