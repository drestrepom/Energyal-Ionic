import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {AddElectrodomesticComponent} from '../../components/add-electrodomestic/add-electrodomestic.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MenuComponent} from '../../components/menu/menu.component';
import {UserComponent} from '../../components/user/user.component';
import {IndexComponent} from '../../components/index/index.component';
import { InfoElctrodComponent } from 'src/app/components/info-elctrod/info-elctrod.component';
import {ElectrodomesticsComponent} from '../../components/electrodomestics/electrodomestics.component';
import {ChartsModule} from 'ng2-charts';
import {StatsPageModule} from '../stats/stats.module';
import {ParametrosPageModule} from '../parametros/parametros.module';
import { from } from 'rxjs';

const routes: Routes = [
    {
        path: '', component: HomePage, children: [
            {path: 'add-electrodomestic', component: AddElectrodomesticComponent},
            {path: 'user', component: UserComponent},
            {path: 'info-electrod/:id', component: InfoElctrodComponent},
            {path: 'electrodomestics', component: ElectrodomesticsComponent},
            {path: 'index', component: IndexComponent},
            { path: 'stats', loadChildren: '../stats/stats.module#StatsPageModule' },
            { path: 'parametros', loadChildren: '../parametros/parametros.module#ParametrosPageModule' }
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
        ChartsModule,
        NgxChartsModule
    ],
    declarations: [
        HomePage,
        AddElectrodomesticComponent,
        MenuComponent,
        UserComponent,
        IndexComponent,
        InfoElctrodComponent,
        ElectrodomesticsComponent
    ],
    exports: [
        MenuComponent
    ]
})
export class HomePageModule {
}
