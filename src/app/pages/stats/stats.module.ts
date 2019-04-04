import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {IonicModule} from '@ionic/angular';

import {StatsPage} from './stats.page';
import {DayComponent} from './day/day.component';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {StatsService} from '../../services/stats.service';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
    {
        path: '', children: [
            {path: 'day', children: [{path: '', component: DayComponent}]},
            {path: 'week', children: [{path: '', component: WeekComponent}]},
            {path: 'month', children: [{path: '', component: MonthComponent}]},
        ],
        component: StatsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxChartsModule,
        HttpClientModule,
        ChartsModule
    ],
    declarations: [StatsPage, DayComponent, WeekComponent, MonthComponent],
    providers: [StatsService]
})
export class StatsPageModule {
}
