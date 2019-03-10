import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public formBuilder: FormBuilder) {
    }

    formLogin: FormControl;

    onSubmit(values) {
        console.log(values);
    }
}
