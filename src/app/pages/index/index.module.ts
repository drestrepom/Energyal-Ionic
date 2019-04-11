import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {IndexPage} from './index.page';
import {RealTimeComponent} from './real-time/real-time.component';
import {DayComponent} from '../stats/day/day.component';
import {WeekComponent} from '../stats/week/week.component';
import {MonthComponent} from '../stats/month/month.component';
import {StatsPage} from '../stats/stats.page';
import {SummaryComponent} from './summary/summary.component';
import {ChartsModule} from 'ng2-charts';
import {KwhPipe} from '../../pipes/kwh.pipe';

const routes: Routes = [
    {
        path: '', children: [
            {path: 'summary', children: [{path: '', component: SummaryComponent}]},
            {path: 'realTime', children: [{path: '', component: RealTimeComponent}]},
        ],
        component: IndexPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ChartsModule
    ],
    declarations: [IndexPage, RealTimeComponent, SummaryComponent, KwhPipe]
})
export class IndexPageModule {
}
