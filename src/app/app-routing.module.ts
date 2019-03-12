import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
    {path: '', redirectTo: 'tabs', pathMatch: 'full'},
    {path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    {path: 'home', loadChildren: './components/home/home.module#HomePageModule'},
    {path: 'principal', loadChildren: './components/principal/principal.module#PrincipalPageModule', canActivate: [LoginGuard]},
    {path: 'registro', loadChildren: './components/registro/registro.module#RegistroPageModule'},
    {path: 'add-disp', loadChildren: './components/add-disp/add-disp.module#AddDispPageModule', canActivate: [LoginGuard]},
  // { path: 'stats', loadChildren: './stats/stats.module#StatsPageModule' },
  // { path: 'user', loadChildren: './user/user.module#UserPageModule' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
