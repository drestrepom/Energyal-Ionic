import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {
        path: 'add-electrodomestic',
        loadChildren: './pages/add-electrodomestic/add-electrodomestic.module#AddElectrodomesticPageModule',
        canActivate: [LoginGuard]
    },  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
