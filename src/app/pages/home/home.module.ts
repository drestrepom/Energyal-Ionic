import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {AddElectrodomesticComponent} from '../../components/add-electrodomestic/add-electrodomestic.component';

import {LoginPageModule} from '../login/login.module';
import {MenuComponent} from '../../components/menu/menu.component';
import {UserComponent} from '../../components/user/user.component';
import {IndexComponent} from '../../components/index/index.component';

const routes: Routes = [
    {
        path: '', component: HomePage, children: [
            {path: 'add-electrodomestic', component: AddElectrodomesticComponent},
            {path: 'user', component: UserComponent},
            {path: 'home', component: IndexComponent}
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
        UserComponent,
        IndexComponent
    ],
    exports: [
        MenuComponent
    ]
})
export class HomePageModule {
}
