import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from 'rxjs';
import * as RecipeFormActions from '../../../store/recipe-form.actions';
import { selectRecetteData } from '../../../store/recipe-form.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-form-1',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-form-1.html',
  styleUrl: './recipe-form-1.scss',
})
export class RecipeForm1 implements OnInit, OnDestroy {

  form: FormGroup;
  selectedFile: File | null = null; // ✅ Fichier réel, pas base64
  imagePreview: string | null = null; // ✅ Pour l'aperçu uniquement
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger les données existantes depuis le store
    this.store.select(selectRecetteData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(recette => {
      if (recette && Object.keys(recette).length > 0) {
        if (recette.name) {
          this.form.patchValue({ 
            name: recette.name || ''
          }, { emitEvent: false });
        }
        if (recette.image) {
          this.imagePreview = recette.image;
        }
      }
    });

    // Sauvegarder les changements du formulaire dans le store
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.store.dispatch(RecipeFormActions.saveRecetteData({
        id: 0,
        name: this.form.value.name,
        image: this.imagePreview || ''
      }));
    });
  }

  /**
   * Gérer la sélection d'une image
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }

      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      this.selectedFile = file; // ✅ Stocker le fichier réel

      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;

        // Sauvegarder dans le store (juste pour l'aperçu)
        this.store.dispatch(RecipeFormActions.saveRecetteData({
          id: 0,
          name: this.form.value.name,
          image: this.imagePreview
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Supprimer l'image sélectionnée
   */
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    
    this.store.dispatch(RecipeFormActions.saveRecetteData({
      id: 0,
      name: this.form.value.name,
      image: ''
    }));
  }

  /**
   * Obtenir le fichier image pour l'envoi au backend
   */
  getImageFile(): File | null {
    return this.selectedFile;
  }

  ngOnDestroy(): void {
    if (this.form.dirty) {
      this.store.dispatch(RecipeFormActions.saveRecetteData({
        id: 0,
        name: this.form.value.name,
        image: this.imagePreview || ''
      }));
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}