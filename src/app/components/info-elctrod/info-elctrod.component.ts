import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ElectrodomesticService} from '../../services/electrodomestic.service';

@Component({
    selector: 'app-info-elctrod',
    templateUrl: './info-elctrod.component.html',
    styleUrls: ['./info-elctrod.component.scss'],
})
export class InfoElctrodComponent implements OnInit {

    constructor(private activateRouter: ActivatedRoute, private electroService: ElectrodomesticService) {
    }

    electrodomestico = {};

    onOffButton: { text, status, color } = {text: 'Apagado', status: false, color: 'danger'};

    challengeStatus(electrodomestic) {
        this.electrodomestico = electrodomestic;
        this.onOffButton.status = this.electrodomestico['onOff'];
        if (this.onOffButton.status) {
            this.onOffButton.text = 'Apagar';
            this.onOffButton.color = 'danger';
        } else {
            this.onOffButton.text = 'Encender';
            this.onOffButton.color = 'success';
        }
    }

    ngOnInit() {
        this.activateRouter.params.subscribe(values => {
            this.electroService.getOne(values.id).subscribe(electrodomestic => {
                this.challengeStatus(electrodomestic);
            });
        });
    }

    onOff() {
        this.electroService.onOff(this.electrodomestico['_id']).subscribe((res) => {
            this.challengeStatus(res);
        });
    }

}
