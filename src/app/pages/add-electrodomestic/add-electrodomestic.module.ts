import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddElectrodomesticPage } from './add-electrodomestic.page';

const routes: Routes = [
  {
    path: '',
    component: AddElectrodomesticPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [AddElectrodomesticPage]
})
export class AddElectrodomesticPageModule {}
