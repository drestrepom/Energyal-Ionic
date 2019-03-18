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
import {UserService} from './services/user.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        LoginGuard
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
    // static  URL_API = 'https://energyal.herokuapp.com/';
    static URL_API = 'http://192.168.0.101:3000/';
    // static URL_API = 'http://10.12.19.94:3000/';
}
