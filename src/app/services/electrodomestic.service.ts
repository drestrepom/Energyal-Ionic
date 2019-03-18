import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/IUser';
import {UserService} from './user.service';
import {Electrodomestic} from '../interfaces/electrodomestic';
import {AppModule} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class ElectrodomesticService {

    constructor ( private http: HttpClient, private sUser: UserService ) {
    }

    url = AppModule.URL_API;
    user = null;

    register(electrodomestic: Electrodomestic): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization':  this.sUser.user.Authorization
        });
        // const headers1 = new HttpHeaders().set('token', this.sUser.user.token);
        // const headers = new HttpHeaders({
        //     'token':  this.sUser.user.token
        // });

        return this.http.post(this.url + 'electrodomestic', electrodomestic, {headers: headers} );
    }
}
