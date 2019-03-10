import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public formBuilder: FormBuilder, public http: HttpClient, private sUser: UserService, private router: Router) {
    }

    Usuario = {
        email: null,
        password: null
    };
    formLogin: FormControl;
    validation_messages = {
        'username': [
            {type: 'required', message: 'Username is required.'},
            {type: 'minlength', message: 'Username must be at least 5 characters long.'},
            {type: 'maxlength', message: 'Username cannot be more than 25 characters long.'},
            {type: 'pattern', message: 'Your username must contain only numbers and letters.'},
            {type: 'validUsername', message: 'Your username has already been taken.'}
        ],
        'name': [
            {type: 'required', message: 'Name is required.'}
        ],
        'lastname': [
            {type: 'required', message: 'Last name is required.'}
        ],
        'email': [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Please wnter a valid email.'}
        ],
        'phone': [
            {type: 'required', message: 'Phone is required.'},
            {type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.'}
        ],
        'password': [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 8 characters long.'},
            {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
        ],
        'confirm_password': [
            {type: 'required', message: 'Confirm password is required.'}
        ],
        'matching_passwords': [
            {type: 'areEqual', message: 'Password mismatch.'}
        ],
        'terms': [
            {type: 'pattern', message: 'You must accept terms and conditions.'}
        ],
    };

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
