import { Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoggedPageComponent } from './logged-page/logged-page.component';

export const routes: Routes = [

    {path: "", component: IndexPageComponent},
    {path: "loggedin", component: LoggedPageComponent},

];
