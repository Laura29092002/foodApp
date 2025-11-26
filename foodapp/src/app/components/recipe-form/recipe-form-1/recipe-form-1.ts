import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {Store} from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from 'rxjs';
import * as RecipeFormActions from '../../../store/recipe-form.actions';
import {selectRecetteData} from '../../../store/recipe-form.selectors';


@Component({
  selector: 'app-recipe-form-1',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form-1.html',
  styleUrl: './recipe-form-1.scss',
})
export class RecipeForm1 implements OnInit, OnDestroy{

  form: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  private destroy$ = new Subject<void>;

  constructor(private store: Store, private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['']
    });
  }

  
  ngOnInit(): void {
    this.store.select(selectRecetteData).pipe(takeUntil(this.destroy$)).subscribe(recette => {
      if (recette && Object.keys(recette).length > 0) {
        if (recette.name){
          this.form.patchValue({ 
            name: recette.name || ''
          }, {emitEvent: false});
        }
        if(recette.image){
          this.imagePreview = recette.image;
        }
        
      }
    });
    

    this.form.valueChanges.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe(value => {
      this.store.dispatch(RecipeFormActions.saveRecetteData({
            
              id: 0,
              name: this.form.value.name,
              image : ''
            
          }));
    });
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;

        this.store.dispatch(
          RecipeFormActions.saveRecetteData(
            {
              id: 0,
              name: this.form.value.name,
              image : this.imagePreview 
            }
          

          )
        )
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  ngOnDestroy(): void {
    if(this.form.dirty) {
      this.store.dispatch(RecipeFormActions.saveRecetteData(this.form.value ));
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
