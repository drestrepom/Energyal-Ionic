import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {RequestOptions} from '@angular/http';
import {Body} from '@angular/http/src/body';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    url = 'https://energyal.herokuapp.com/';
    // url = 'http://10.12.19.94:3000/';
    // url = 'http://10.12.19.94:3000/';
    user = null;

    constructor(private http: HttpClient) {
    }

    login(user): Observable<any> {
        // Establecemos cabeceras
        return this.http.post(this.url + 'login', user);
    }

    logOut() {
        this.user = null;
    }

    exists(email: string): Observable<any> {
        const body = {email: email};
        console.log('cuerpo', body);
        return this.http.get(this.url + 'user/exists', {params: new HttpParams().set('email', email)});
    }

    register(user: User): Observable<any> {
        return this.http.post(this.url + 'usuario', user);
    }
}
