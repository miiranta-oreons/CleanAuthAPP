import { Routes } from '@angular/router';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoggedPageComponent } from './components/logged-page/logged-page.component';
import { isNotLoggedGuard } from './guards/is-not-logged.guard';
import { isLoggedGuard } from './guards/is-logged.guard';

export const routes: Routes = [
    {path: "", component: IndexPageComponent, canActivate: [isNotLoggedGuard]},
    {path: "logged", component: LoggedPageComponent, canActivate: [isLoggedGuard]},

    {path: "**", redirectTo: ""}
];
