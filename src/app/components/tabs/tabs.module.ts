import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { StatsPage } from '../stats/stats.page';
import { UserPage } from '../user/user.page';
import { StatsPageModule } from '../stats/stats.module';
import { UserPageModule } from '../user/user.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'stats',
        outlet: 'stats',
        component: StatsPage
      },
      {
        path: 'user',
        outlet: 'user',
        component: UserPage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StatsPageModule,
    UserPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
