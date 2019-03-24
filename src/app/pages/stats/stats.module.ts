import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatsPage } from './stats.page';
import {DayComponent} from './day/day.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'day', children: [ {path: '', component: DayComponent}]},
      {path: 'week', children: [ {path: '', component: DayComponent}]},
      {path: 'month', children: [ {path: '', component: DayComponent}]},
    ],
    component: StatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
