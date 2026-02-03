import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegimeService } from '../../services/regime/regime';
import { Regime } from '../../models/regime/regime.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';

@Component({
  selector: 'app-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup implements OnInit{
  @Output() closePopup =  new EventEmitter<boolean>();
  regimes : Regime[] = [];
  form: FormGroup;
  user : User | null = null;

  constructor(private regimeService : RegimeService, private fb: FormBuilder, private userService : UserService){
    this.form = this.fb.group({
      nbPerson: [ this.user?.nbPerson || 1, Validators.required],
      regimeId: [this.user?.regimeId ||''],
    })

  }

  ngOnInit(): void {
    this.regimeService.getRegimes().subscribe(
      data =>{
        this.regimes = data
      }
    );
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        this.form.patchValue({
          nbPerson:  this.user?.nbPerson || 1,
          regimeId: this.user?.regimeId || 5,
        })
      }
    )
  }

  submit(){
    if(this.form.value.nbPerson){
      console.log(this.form.value);
      this.close();
      this.user!.nbPerson = this.form.value.nbPerson;
      if(this.form.value.regimeId){
        this.user!.regimeId = this.form.value.regimeId;
      }
      this.userService.updateUser(this.user!).subscribe();
    }else{
      alert('Veillez renseigner le nombre de personne');
    }
    
  }
  close(){
    this.closePopup.emit(false);
  }
}
