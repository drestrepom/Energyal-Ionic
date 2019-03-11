import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    url = 'https://energyal.herokuapp.com/';
    // url = 'http://192.168.0.101:3000/';
    user = null;
    constructor(private http: HttpClient) {
    }

    login(user): Observable<any> {
        // Establecemos cabeceras
        return this.http.post(this.url + 'login', user);
    }
    register(user: User): Observable<any> {
        return this.http.post(this.url + 'usuario', user);
    }
}
