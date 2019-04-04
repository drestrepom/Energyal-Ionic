import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_API} from '../../config/config';
import {Observable} from 'rxjs';

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

    constructor(private http: HttpClient) {
    }

    dates(start: Date, end: Date, length?: number): Observable<any> {
        const body = {
            startDate: start,
            endDate: end,
            idMeter: '5c96defb3e46080d78bd1af1',
            length
        };
        return this.http.post(this.url + 'stats', body);
    }

    labelsHours() {
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 1, 0, 0);
        const labels = [];
        for (let i = 0; i < endTime.getHours(); i++) {
            const element = i < 12 ? `${i} am` : `${i - 12} pm`;
            labels.push(element);
        }
        // const startTime = new Date();

        // startTime.setHours(0, 0, 0);
        // const length = endTime.getHours();
        // const labels = new Array(length);
        // const dates = [];
        // const div = (endTime.getTime() - startTime.getTime()) / length;
        // for (let i = 0; i <= length; i++) {
        //     const itemDate = new Date(startTime.getTime() + (i * div));
        //     dates.push(itemDate['getUTCHours']());
        // }
        return labels;
    }

    labelsMounth(start: Date, end: Date, length: number) {
        const labels = new Array(length / 2);
        const dates = [];
        const div = (end.getTime() - start.getTime()) / length;
        for (let i = 0; i <= length; i++) {
            const itemDate = new Date(start.getTime() + (i * div));
            dates.push(itemDate['getUTCHours']());
        }
        return dates;
    }
}
