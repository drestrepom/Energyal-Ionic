import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/IUser';
import {RequestOptions} from '@angular/http';
import {Body} from '@angular/http/src/body';

// import * as emailExistence from 'email-existence';
import {AppModule} from '../app.module';
import {FormControl} from '@angular/forms';
import {URL_API} from '../../config/config';
import {SocketService} from './socket.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = URL_API;

    user = null;

    userLoge = new EventEmitter();

    constructor(private http: HttpClient, private socketService: SocketService) {
    }

    login(user): Observable<any> {
        // Establecemos cabeceras
        const logInfo = this.http.post(this.url + 'user/login', user);
        logInfo.subscribe(value => {
            this.userLoge.emit(true);
            this.socketService.newSession(value['user']._id);
            console.log(this.user);
        });
        return logInfo;
    }

    getUser() {
        return this.user;
    }

    logOut() {
        if (this.user) {
            this.socketService.closeSession(this.user._id);
        }
        this.user = null;
    }

    exists(control: FormControl) {
        const that = this;
        console.log('cuerpo', control.value);
        return that.http.get(this.url + `user/${control.value}`);
    }

    register(user: IUser): Observable<any> {
        return this.http.post(this.url + 'user', user);
    }

    getElectrodomestic(): Observable<any> {
        console.log('user id: ', this.user.user._id);
        return this.http.get(this.url + `user/electrodomestics/${this.user.user._id}`);
    }

    async challengPassword(oldPassword, newPassword) {
        return await this.http.put(this.url + 'user', {
            id: this.user.user._id,
            newPassword,
            oldPassword
        }).subscribe(value => {
            console.log(value);
            return true;
        });
    }

    // async emailExist(control: FormControl) {
    //     let valid = null;
    //    return this.http.get(this.url + `user/${control.value}`).subscribe(value => {
    //         console.log('El usuario', value);
    //         valid = value;
    //     });
    //     console.log('valid', valid);
    //     return valid;
    // }
}
