import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {UserService} from './user.service';
import {Electrodomestic} from '../interfaces/electrodomestic';

@Injectable({
    providedIn: 'root'
})
export class ElectrodomesticService {

    constructor ( private http: HttpClient, private sUser: UserService ) {
    }

    url = 'http://192.168.0.101:3000/';
    // url = 'https://energyal.herokuapp.com/';
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
