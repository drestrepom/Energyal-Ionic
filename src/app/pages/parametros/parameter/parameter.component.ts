import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ParameterService} from '../../../services/parameter.service';
import {UserService} from '../../../services/user.service';
import {Alerts} from '../../../../utils/alerts';

@Component({
    selector: 'app-parameter',
    templateUrl: './parameter.component.html',
    styleUrls: ['./parameter.component.scss'],
})
export class ParameterComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input() scale: string;
    @Input() iconName: string;

    parameters = {money: null, kwh: null};

    forma: FormGroup;

    controlsFocus = {kwh: false, money: false};

    init = false;

    constructor(private parameterService: ParameterService, private userService: UserService, private alerts: Alerts) {
        this.forma = new FormGroup(
            {
                'kwh': new FormControl(),
                'money': new FormControl()
            }
        );

        this.forma.controls.kwh.valueChanges.subscribe(value => {
            if (!this.controlsFocus.money && this.controlsFocus.kwh) {
                this.forma.controls.money.setValue(value * this.parameterService.valueKwh);
            }
        });
        this.forma.controls.money.valueChanges.subscribe(value => {
            if (!this.controlsFocus.kwh &&  this.controlsFocus.money) {
                this.forma.controls.kwh.setValue(value / this.parameterService.valueKwh);
            }
        });
    }

    ngOnInit() {
        if (this.parameterService.parameterValues) {
            this.forma.controls.money.setValue(this.parameterService.parameterValues[this.scale]['money']);
            this.forma.controls.kwh.setValue(this.parameterService.parameterValues[this.scale]['kwh']);
        } else {
            this.parameterService.completeEvent.subscribe(() => {
                this.forma.controls.money.setValue(this.parameterService.parameterValues[this.scale]['money']);
                this.forma.controls.kwh.setValue(this.parameterService.parameterValues[this.scale]['kwh']);
            });
        }
    }

    guardar() {
        this.parameterService.update({...this.forma.value, scale: this.scale, user: this.userService.user.user._id})
            .subscribe(value => this.alerts.presentAlertMesagge('Actualizado correctamente'));
    }

    outFocus(control) {
        // console.log('out: ', control);
        // console.log(this.controlsFocus[control]);
        this.controlsFocus[control] = false;
    }

    inFocus(control) {
        // console.log('in: ', control);
        this.controlsFocus[control] = true;
    }

}
