import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/IUser';
import {RequestOptions} from '@angular/http';
import {Body} from '@angular/http/src/body';
import {AppModule} from '../app.module';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = AppModule.URL_API;

    user = null;

    constructor(private http: HttpClient) {
    }

    login(user): Observable<any> {
        // Establecemos cabeceras
        return this.http.post(this.url + 'user/login', user);
    }

    getUser() {
        return this.user;
    }

    logOut() {
        this.user = null;
    }

    exists(email: string): Observable<any> {
        const body = {email: email};
        console.log('cuerpo', body);
        return this.http.get(this.url + 'user/exists', {params: new HttpParams().set('email', email)});
    }

    register(user: IUser): Observable<any> {
        return this.http.post(this.url + 'user', user);
    }
}
