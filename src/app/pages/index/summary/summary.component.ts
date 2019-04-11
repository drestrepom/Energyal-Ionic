import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../../services/stats.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

    day = {
        value: {value : 0},
        meta: 5000
    };
    week = {
        value: {value : 0},
        meta: 1000
    };
    mounth = {
        value: {value : 0},
        meta: 5800
    };

    constructor(private statsService: StatsService) {
    }

    ngOnInit() {
        const startD = new Date();
        const startW = new Date();
        const startM = new Date();
        const end = new Date();
        startD.setHours(0, 0, 0);
        startW.setDate(end.getDate() - end.getUTCDay());
        startM.setDate(end.getDate() - end.getDay());
        this.statsService.sumUser(startD, end).subscribe(value => {
            this.day.value = value[0];
            console.log(this.day.value);
        });
        this.statsService.sumUser(startW, end).subscribe(value => {
            this.week.value = value[0];
            console.log(this.week.value);
        });
        this.statsService.sumUser(startM, end).subscribe(value => {
            this.mounth.value = value[0];
            console.log(this.mounth.value);
        });
    }

}

interface InfoCons {
    kwh: number;
    value: number;
}
