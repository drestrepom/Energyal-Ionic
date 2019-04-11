import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../../services/stats.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

    day = {
        value: 0
    };
    week = {
        value: 0
    };
    mounth = {
        value: 0
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
            this.day = value[0];
            console.log(this.day);
        });
        this.statsService.sumUser(startW, end).subscribe(value => {
            this.week = value[0];
            console.log(this.week);
        });
        this.statsService.sumUser(startM, end).subscribe(value => {
            this.mounth = value[0];
            console.log(this.mounth);
        });
    }

}

interface InfoCons {
    kwh: number;
    value: number;
}
