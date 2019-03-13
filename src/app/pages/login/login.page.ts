import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    forma: FormGroup;
    // @ts-ignore
    patterns = require('../../../assets/utils/validation.patterns.json');

    constructor(private sUser: UserService, private router: Router, public alertController: AlertController, public loadingController: LoadingController) {
        this.forma = new FormGroup({
            'email': new FormControl('', [
                Validators.required,
                Validators.pattern(this.patterns.email)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.pattern('^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$'),
                Validators.minLength(8),
                Validators.maxLength(16),
            ] )
        });
    }

    Usuario = {
        email: null,
        password: null
    };
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    ngOnInit() {}

    login(forma: NgForm) {
        console.log('value', forma.value);
        this.sUser.login({
            email: forma.value.email,
            password: forma.value.password
        }).subscribe(result => {
            this.loadingController.dismiss();
            console.log(result);
            if (result.ok) {
                this.sUser.user = result;
                console.log('service', this.sUser.user);
                this.router.navigate(['/principal']);
            } else {
                this.loginFailed();
            }
        }, error => {
            console.log(error);
            this.loadingController.dismiss();
            this.loginFailed();
        });
    }
    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Cargando',
            duration: 2000
        });
        await loading.present();
        console.log('Loading dismissed!');
    }

    async loginFailed() {
        // console.log(error.error.error.message);
        const alert = await this.alertController.create({
            header: 'Error!!',
            subHeader: 'Error al iniciar sesión',
            message: '<h3>usuario o contraseña incorrectos</h3>',
            buttons: [{
                text: 'OK'
            }]
        });
        await alert.present();
    }
}
