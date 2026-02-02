import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Step } from '../../../models/step/step.model';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStepsData } from '../../../store/recipe-form.selectors';
import * as RecipeFormActions from '../../../store/recipe-form.actions';
import { StepService } from '../../../services/step/step';

@Component({
  selector: 'app-add-steps-to-recipe',
  imports: [FormsModule],
  templateUrl: './add-steps-to-recipe.html',
  styleUrl: './add-steps-to-recipe.scss',
})
export class AddStepsToRecipe implements OnInit, OnDestroy{
  @Input() recipeId : number | null = null;
  textareaFields: Step[] = [];
  submitted = false;
  private destroy$ = new Subject<void>;
  private updateSubject$ = new Subject<void>;

  constructor(private store: Store, private stepService : StepService){}

  ngOnInit(): void {
    if(this.recipeId){
      this.stepService.getStepByRecipe(this.recipeId).subscribe(
        data => {
          data.sort((a, b) => a.id - b.id);
          this.textareaFields = data;
          this.updateStore();
        }
      )
    }
    this.store.select(selectStepsData).pipe(takeUntil(this.destroy$)).subscribe(steps => {
      if (steps && steps.length > 0) {
        this.textareaFields = steps.map(step => ({ ...step }));
      }
      else if(this.textareaFields.length == 0){
        this.addTextarea();
      }
    });
      this.updateSubject$.pipe(debounceTime(1000), takeUntil(this.destroy$)).subscribe(() => {
        this.updateStore();
      });
      
  }

  addTextarea() {
    const newId = this.textareaFields.length > 0 
      ? Math.max(...this.textareaFields.map(f => f.id)) + 1 
      : 1;
    
    const newStep: Step = {
      id: newId,
      description: '',
      number: this.textareaFields.length + 1,
      recipeId: 0
    };
    
    this.textareaFields.push(newStep);
    this.updateStore();
  }

  removeTextarea(index: number) {
    console.log(index);
    if (this.textareaFields.length > 1) {
      this.textareaFields.splice(index, 1);
      this.textareaFields.forEach((step,i) => {
        step.number = i + 1
      })
      
      console.log(this.textareaFields)
      this.updateStore();
    }
  }

  onTextareaChange() {
    // Déclencher la mise à jour avec debounce
    this.updateSubject$.next();
  }

  private updateStore() {
    // Sauvegarder toutes les étapes dans le store
    this.store.dispatch(
      RecipeFormActions.saveStepsData({ 
        steps: this.textareaFields 
      })
    );
  }

  ngOnDestroy() {
    // Sauvegarder une dernière fois avant destruction
    this.updateStore();
    this.destroy$.next();
    this.destroy$.complete();
  }


}
