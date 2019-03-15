import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {AddElectrodomesticComponent} from '../../components/add-electrodomestic/add-electrodomestic.component';

import {LoginPageModule} from '../login/login.module';
import {MenuComponent} from '../../components/menu/menu.component';
import {AdddComponent} from '../../components/addd/addd.component';
import {UserComponent} from '../../components/user/user.component';

const routes: Routes = [
    {
        path: 'home', component: HomePage, children: [
            {path: 'add-electrodomestic', component: AddElectrodomesticComponent},
            {path: 'addd', component: AdddComponent},
            {path: 'user', component: UserComponent}
        ]
    },
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
    declarations: [
        HomePage,
        AddElectrodomesticComponent,
        MenuComponent,
        AdddComponent,
        UserComponent
    ],
    exports: [
        MenuComponent
    ]
})
export class HomePageModule {
}
