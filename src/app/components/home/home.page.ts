import {Component} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private sUser: UserService, private router: Router) {
    }

    Usuario = {
        email: null,
        password: null
    };
    formLogin: FormControl;
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    login(forma: NgForm) {
        console.log('formulario Posteado');
        console.log('ngForm', forma);
        console.log('valor forma', forma.value);
        console.log(this.Usuario);
        this.sUser.login({
            email: forma.value.email,
            password: forma.value.password
        }).subscribe(result => {
            if (result.ok) {
                this.sUser.user = result;
                console.log('service', this.sUser.user);
                this.router.navigate(['/principal']);
            }
            console.log(result);
        });
    }
}
