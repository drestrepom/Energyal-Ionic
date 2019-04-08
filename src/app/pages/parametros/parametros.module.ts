import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParametrosPage } from './parametros.page';
import {DayComponent} from './day/day.component';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';

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
    ChartsModule
  ],
  declarations: [ParametrosPage, DayComponent, WeekComponent, MonthComponent]
})
export class ParametrosPageModule {}
