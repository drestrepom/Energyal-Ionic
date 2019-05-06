import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_API} from '../../config/config';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    url = URL_API;
    daysOfWeake = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ];

    constructor(private http: HttpClient, private  userService: UserService) {
    }

    datesUser(start: Date, end: Date, length?: number):
        Observable<any> {
        console.log(end);
        const body = {
            startDate: start,
            endDate: end,
            user: this.userService.user.user._id,
            length
        };
        return this.http.post(this.url + 'stats/user', body);
    }

    datesMeter(start: Date, end: Date, length?: number): Observable<any> {
        const body = {
            startDate: start,
            endDate: end,
            idMeter: '5c96defb3e46080d78bd1af1',
            length
        };
        return this.http.post(this.url + 'stats', body);
    }

    sumUser(start: Date, end: Date):
        Observable<any> {
        const body = {
            startDate: start,
            endDate: end,
            user: this.userService.user.user._id,
        };
        return this.http.post(this.url + 'stats/sum/user', body);
    }

    labelsMonth(endtime?) {
        const endTime = endtime || new Date();
        const labels = [];
        for (let i = 1; i < endTime.getDate() + 1; i++) {
            labels.push(i);
        }
        return labels;
    }

    labelsHours(endtime?) {
        const endTime = endtime || new Date();
        endTime.setHours(endTime.getHours(), 0, 0);
        const labels = [];
        for (let i = 0; i < endTime.getHours(); i++) {
            const element = i < 12 ? `${i} am` : `${i - 12} pm`;
            labels.push(element);
        }
        return labels;
    }
}
