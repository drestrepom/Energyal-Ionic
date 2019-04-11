import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';
import {RTimeComponent} from './r-time/r-time.component';
import {ResumenComponent} from './resumen/resumen.component';
import {HttpClientModule} from '@angular/common/http';

  import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '', children: [
      {path: 'r_time', children: [{path: '', component: RTimeComponent}]},
      {path: 'resumen', children: [{path: '', component: ResumenComponent}]}
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
    HttpClientModule
  ],
  declarations: [IndexPage, RTimeComponent, ResumenComponent]
})
export class IndexPageModule {}
