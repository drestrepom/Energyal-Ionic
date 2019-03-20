import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ElectrodomesticService} from '../../services/electrodomestic.service';

@Component({
    selector: 'app-info-elctrod',
    templateUrl: './info-elctrod.component.html',
    styleUrls: ['./info-elctrod.component.scss'],
})
export class InfoElctrodComponent implements OnInit {

    electrodomestico = {};

    constructor(private activateRouter: ActivatedRoute, private electroService: ElectrodomesticService) {
    }

    ngOnInit() {
    this.activateRouter.params.subscribe(values => {
        this.electroService.getOne(values.id).subscribe(value => {
            this.electrodomestico = value;
            console.log(this.electrodomestico);
        });
        });
    }


}
