import {Component, OnInit} from '@angular/core';
import {ParameterService} from '../../services/parameter.service';

@Component({
    selector: 'app-parametros',
    templateUrl: './parametros.page.html',
    styleUrls: ['./parametros.page.scss'],
})
export class ParametrosPage implements OnInit {

    constructor(private parameterService: ParameterService) {
    }

    ngOnInit() {
        // this.parameterService.get();
    }

}
