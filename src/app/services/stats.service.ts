import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_API} from '../../config/config';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    url = URL_API;

    constructor(private http: HttpClient) {
    }

    stats(start: Date, end: Date, length?: number): Observable<any> {
        const body = {
            startDate: start,
            endDate: end,
            idMeter: '5c96defb3e46080d78bd1af1'
        };
        return this.http.post(this.url + 'stats', body);
    }

    labelsTime(start: Date, end: Date, length: number) {
        const labels = [];
        const dates = [];
        const div = (end.getTime() - start.getTime()) / length;
        for (let i = 0; i <= length; i++) {
            const itemDate = new Date(start.getTime() + (i * div));
            dates.push(itemDate.getUTCDate());
        }
        return dates;
    }
}
