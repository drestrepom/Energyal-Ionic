import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../../services/stats.service';
import {ParameterService} from '../../../services/parameter.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

    day = {
        value: {value: 0, kwh: 0},
        meta: 0,
        progress: 0
    };
    week = {
        value: {value: 0, kwh: 0},
        meta: 0,
        progress: 0
    };
    month = {
        value: {value: 0, kwh: 0},
        meta: 0,
        progress: 0
    };

    constructor(private statsService: StatsService, private parametersService: ParameterService) {
    }

    ionViewWillEnter() {
        this.parametersService.get();
        console.log('new veew');
        if (this.parametersService.parameterValues) {
            console.log('si');
            this.day.meta = this.parametersService.parameterValues.day.money;
            this.week.meta = this.parametersService.parameterValues.week.money;
            this.month.meta = this.parametersService.parameterValues.month.money;
        } else {
            console.log('no');
            this.parametersService.completeEvent.subscribe(() => {
                this.day.meta = this.parametersService.parameterValues.day.money;
                this.week.meta = this.parametersService.parameterValues.week.money;
                this.month.meta = this.parametersService.parameterValues.month.money;
            });
        }
        const startD = new Date();
        const startW = new Date();
        const startM = new Date();
        const end = new Date();
        startD.setHours(0, 0, 0);
        startW.setDate(end.getDate() - end.getDay() === 0 ? 7 : end.getDay());
        startM.setDate(0);
        this.statsService.sumUser(startD, end).subscribe(value => {
            this.day.value = value[0];
            this.day.progress = this.day.value.value / this.day.meta;
        });
        this.statsService.sumUser(startW, end).subscribe(value => {
            this.week.value = value[0];
            this.week.progress = this.week.value.value / this.week.meta;
        });
        this.statsService.sumUser(startM, end).subscribe(value => {
            this.month.value = value[0];
            this.month.progress = this.month.value.value / this.month.meta;
        });
    }

    ngOnInit() {

    }

    setValueProgress(scale) {
        return this[scale].value.value / this[scale].meta;
    }

}

interface InfoCons {
    kwh: number;
    value: number;
}
