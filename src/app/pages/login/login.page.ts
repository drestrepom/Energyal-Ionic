import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {SocketService} from '../../services/socket.service';
import {ParameterService} from '../../services/parameter.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    forma: FormGroup;
    // @ts-ignore
    patterns = require('../../../assets/utils/validation.patterns.json');

    constructor(private userService: UserService,
                private router: Router,
                public alertController: AlertController,
                public loadingController: LoadingController,
                private soketService: SocketService) {
        this.userService.logOut();
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
        this.userService.logOut();
    }

    async login() {
        const load = await this.presentLoading();
        this.userService.login({
            email: this.forma.value.email,
            password: this.forma.value.password
        }).subscribe(result => {
            if (result.ok) {
                this.userService.user = result;
                this.router.navigate(['/home/index/realTime']).then(value => {
                    this.forma.reset();
                    load.dismiss();
                    this.userService.userLoge.emit(true);
                });
            } else {
                load.dismiss();
                this.loginFailed();
            }
        }, error => {
            console.log(error);
            this.alertController.dismiss();
            this.loginFailed();
        });
    }

    async loginDesarrollo() {
        const load = await this.presentLoading();
        this.userService.login({
            email: 'pruebas@gmail.com',
            password: '123456789'
        }).subscribe(result => {
            if (result.ok) {
                this.userService.user = result;
                this.router.navigate(['/home/index/realTime']).then(value => {
                    this.forma.reset();
                    load.dismiss();
                    this.userService.userLoge.emit(true);
                });
            } else {
                load.dismiss();
                this.loginFailed();
            }
        }, error => {
            console.log(error);
            this.alertController.dismiss();
            this.loginFailed();
        });
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
