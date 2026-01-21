import { Routes } from '@angular/router';
import { PlanningPage } from './pages/planning-page/planning-page';
import { RecipesPage } from './pages/recipes-page/recipes-page';
import { ShoppingPage } from './pages/shopping-page/shopping-page';
import { RecipePage } from './pages/recipe-page/recipe-page';
import { RecipeForm } from './pages/recipe-form/recipe-form';
import { SettingsPage } from './pages/settings-page/settings-page';
import { CreatePlanningPage } from './pages/create-planning-page/create-planning-page';
import { LoginPage } from './pages/login-page/login-page';
import { LayoutPage } from './pages/layout-page/layout-page';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginPage
    },
    {
        path: '',
        component: LayoutPage,
        children:[
            {
                path: 'home',
                component: PlanningPage,
            },
            {
            path: 'recipes',
            component: RecipesPage,
        },
        {
            path: 'recipes-select',
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
        },
        {
            path: 'modify-planning',
            component: CreatePlanningPage
        }

        ]
    },
    {
        path: '**',
        component: LoginPage
    }
];
