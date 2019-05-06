import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ParametrosPage} from './parametros.page';
import {DayComponent} from './day/day.component';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {ParameterComponent} from './parameter/parameter.component';
import {ParameterService} from '../../services/parameter.service';
import {Alerts} from '../../../utils/alerts';

const routes: Routes = [
    {
        path: '', children: [
            {path: 'day', children: [{path: '', component: DayComponent}]},
            {path: 'week', children: [{path: '', component: WeekComponent}]},
            {path: 'month', children: [{path: '', component: MonthComponent}]},
        ],

        component: ParametrosPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        ChartsModule,
        ReactiveFormsModule
    ],
    declarations: [ParametrosPage, DayComponent, WeekComponent, MonthComponent, ParameterComponent]
})
export class ParametrosPageModule {
    constructor() {
    }
}
