import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy, MenuController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import {LoginGuard} from './guards/login.guard';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {URL_API} from '../config/config';
import {ChartsModule} from 'ng2-charts';
import {StatsService} from './services/stats.service';

const config: SocketIoConfig = {url: URL_API, options: {}};

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { KwhPipe } from './pipes/kwh.pipe';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        ChartsModule],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        LoginGuard,
        StatsService
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}
