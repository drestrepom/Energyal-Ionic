import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {AdddComponent} from '../../components/addd/addd.component';

const routes: Routes = [
    {
        path: '', component: HomePage, children: [
            {path: 'addd', component: AdddComponent}
        ]
    },

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage, AdddComponent]
})
export class HomePageModule {
}
