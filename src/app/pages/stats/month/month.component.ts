import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {StatsService} from '../../../services/stats.service';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {

    constructor(private statsService: StatsService) {
    }

    lineChartData: ChartDataSets[] = [
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'kWh'},
    ];
    lineChartLabels: Label[] = ['', '', '', '', '', '', ''];
    lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                },
                // {
                //     id: 'y-axis-1',
                //     position: 'right',
                //     gridLines: {
                //         color: 'rgba(255,0,0,0.3)',
                //     },
                //     ticks: {
                //         fontColor: 'red',
                //     }
                // }
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    lineChartColors: Color[] = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    lineChartLegend = true;
    lineChartType = 'line';
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    startTime: Date;
    endTime: Date;

    title;

    datasets;

    ionViewWillEnter() {
        this.startTime = new Date();
        this.endTime = new Date();
        this.startTime.setDate(0);
        this.startTime.setHours(0, 0, 0);
        this.endTime.setHours(this.endTime.getHours() + 1, 0, 0);
        this.lineChartLabels = this.statsService.labelsMonth(this.endTime);
        const day = this.statsService.datesUser(this.startTime, this.endTime, this.endTime.getDate())
            .subscribe(value => {
                this.datasets = value;
                console.log(value);
                this.challengeLabels('money');
            });
    }

    ngOnInit() {

    }

    challengeLabels(name) {
        this.title = name;
        const lineChartData: ChartDataSets[] = new Array(this.lineChartData.length - 1);
        // @ts-ignore
        lineChartData[0] = {label: name, data: this.datasets[name]};
        this.lineChartData = lineChartData;
    }

    randomize(): void {
        for (let i = 0; i < this.lineChartData.length; i++) {
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                this.lineChartData[i].data[j] = this.generateNumber(i);
            }
        }
        this.chart.update();
    }

    private generateNumber(i: number) {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }

    // events
    chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    hideOne() {
        const isHidden = this.chart.isDatasetHidden(1);
        this.chart.hideDataset(1, !isHidden);
    }

    pushOne() {
        this.lineChartData.forEach((x, i) => {
            const num = this.generateNumber(i);
            const data: number[] = x.data as number[];
            data.push(num);
        });
        this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
    }

    changeColor() {
        this.lineChartColors[2].borderColor = 'green';
        this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    }

    changeLabel() {
        this.lineChartLabels[2] = ['1st Line', '2nd Line'];
        // this.chart.update();
    }

}
