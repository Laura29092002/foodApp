import { Routes } from '@angular/router';
import { PlanningPage } from './pages/planning-page/planning-page';
import { RecipesPage } from './pages/recipes-page/recipes-page';
import { ShoppingPage } from './pages/shopping-page/shopping-page';
import { RecipePage } from './pages/recipe-page/recipe-page';
import { RecipeForm } from './pages/recipe-form/recipe-form';
import { SettingsPage } from './pages/settings-page/settings-page';

export const routes: Routes = [
    {
        path: '',
        component: PlanningPage,
    },
    {
        path: 'recipes',
        component: RecipesPage,
    },
    {
        path: 'shopping-list',
        component: ShoppingPage,
    },
    {
        path: 'recipe/:id',
        component: RecipePage,
    },
    {
        path: 'create-recipe',
        component: RecipeForm,
    },
    {
        path: 'settings',
        component: SettingsPage
    }
];
