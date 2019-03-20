import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/IUser';
import {UserService} from './user.service';
import {IElectrodomestic} from '../interfaces/electrodomestic';
import {AppModule} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class ElectrodomesticService {

    constructor(private http: HttpClient, private sUser: UserService) {
    }

    url = AppModule.URL_API;
    user = null;

    register(electrodomestic: IElectrodomestic): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.sUser.user.Authorization
        });
        return this.http.post(this.url + 'electrodomestic', electrodomestic, {headers: headers});
    }

     getOne(idElectro: string): Observable<any> {
        return  this.http.get(this.url + 'electrodomestic/', {params: new HttpParams().set('id', idElectro)});
    }
}
