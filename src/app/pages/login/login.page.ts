import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    forma: FormGroup;
    // @ts-ignore
    patterns = require('../../../assets/utils/validation.patterns.json');

    constructor(private sUser: UserService,
                private router: Router,
                public alertController: AlertController,
                public loadingController: LoadingController) {
        this.sUser.logOut();
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
            ])
        });
    }

    Usuario = {
        email: null,
        password: null
    };
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    ngOnInit() {
        this.sUser.logOut();
    }

    async login(forma: NgForm) {
        const load = await this.presentLoading();
        console.log('value', forma.value);
        this.sUser.login({
            email: forma.value.email,
            password: forma.value.password
        }).subscribe(result => {
            console.log(result);
            load.dismiss();
            if (result.ok) {
                this.sUser.user = result;
                this.forma.reset();
                this.router.navigate(['/home']);
            } else {
                this.loginFailed();
            }
        }, error => {
            console.log(error);
            this.alertController.dismiss();
            this.loginFailed();
        });
    }

    loginDesarrollo() {
        const user = {
            'ok': true,
            'user': {
                'city': 'Medellín',
                '_id': '5c91b4a1be8adf5e6863e296',
                'email': 'darkhell2241@gmail.com',
                'name': 'Daniel Amaya',
                'password': '$2b$10$sBMFRKObrFNxsFZ0sfBM.e1SQNzQOgEqsQhgMXy2fxuT8W.JNjVnq'
            },
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNpdHkiOiJNZWRlbGzDrW4iLCJfaWQiOiI1YzkxYjRhMWJlOGFkZjVlNjg2M2UyOTYiLCJlbWFpbCI6ImRhcmtoZWxsMjI0MUBnbWFpbC5jb20iLCJuYW1lIjoiRGFuaWVsIEFtYXlhIiwicGFzc3dvcmQiOiIkMmIkMTAkc0JNRlJLT2JyRk54c0ZaMHNmQk0uZTFTUU56UU9nRXFzUWhnTVh5MmZ4dVQ4Vy5KTmpWbnEifSwiaWF0IjoxNTUzMTIzNTMwLCJleHAiOjE1NTMxNjY3MzB9.Vcu8i6t6OoZ8xEoy8xblfus00FSy3cg8gCiQpg_UNlM'
        };
        this.sUser.user = user;
        this.router.navigate(['/home']);
    }

    async presentLoading() {
        const alert = await this.alertController.create({
            message: '<ion-spinner color="primary"></ion-spinner> Cargando...'
        });
        alert.present();
        return alert;
    }

    async loginFailed() {
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

    ngOnDestroy(): void {
        console.log('login destroy');
    }
}
