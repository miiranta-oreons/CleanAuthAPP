import { Routes } from '@angular/router';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoggedPageComponent } from './components/logged-page/logged-page.component';

export const routes: Routes = [
    {path: "", component: IndexPageComponent},
    {path: "logged", component: LoggedPageComponent},

    {path: "**", redirectTo: ""}
];
