import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_API} from '../../config/config';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ParameterService {

    valueKwh: number;
    parameterValues;
    completeEvent = new EventEmitter();

    constructor(private http: HttpClient,
                private userService: UserService) {
        this.get();
    }

    update(data: { user: string, money: number, kwh: number, scale: string }) {
        return this.http.put(`${URL_API}parameter`, data);
    }

    get() {
        this.parameterValues = undefined;
        this.http.get(`${URL_API}value-kwh/${this.userService.user.user.stratum}`).subscribe(value => {
            this.valueKwh = value['value'];
            this.http.get(`${URL_API}parameter/${this.userService.user.user._id}`).subscribe(value2 => {
                this.parameterValues = value2['parameters'];
                this.completeEvent.emit(true);
            });
        });

    }
}
