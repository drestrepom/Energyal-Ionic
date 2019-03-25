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

const routes: Routes = [
    {
        path: 'home', component: HomePage, children: [
            {path: 'add-electrodomestic', component: AddElectrodomesticComponent},
            {path: 'user', component: UserComponent},
            {path: 'info-electrod/:id', component: InfoElctrodComponent},
            {path: 'electrodomestics', component: ElectrodomesticsComponent},
            {path: 'home', component: IndexComponent},
            { path: 'stats', loadChildren: '../stats/stats.module#StatsPageModule' }
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
        StatsPageModule,
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
