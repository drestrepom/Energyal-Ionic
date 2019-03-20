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

    constructor(private sUser: UserService, private router: Router, public alertController: AlertController, public loadingController: LoadingController) {
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
                'city': 'medellin',
                'status': true,
                '_id': '5c82c8787b6a5045685ab328',
                'email': 'ccc',
                'name': 'Henry Castañeda',
                'password': '$2b$10$CTmtiIXYkFEL81gSvbHRz.SINqhV3u0BCjma5ALvWkaSvtYXxIk0u',
                'electrodomestics': [
                    {
                        'role': 'ADMIN',
                        '_id': '5c83f628adcb3303185c0c14',
                        'electrodomestic': {
                            '_id': '5c83f628adcb3303185c0c12',
                            'name': 'lampara melo'
                        }
                    },
                    {
                        'role': 'ADMIN',
                        '_id': '5c83f628adcb3303185c0c14',
                        'electrodomestic': {
                            '_id': '5c83f628adcb3303185c0c12',
                            'name': 'lampara melo'
                        }
                    }
                ],
                '__v': 0
            },
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNpdHkiOiJtZWRlbGxpbiIsInN0YXR1cyI6dHJ1ZSwiX2lkIjoiNWM4MmM4Nzg3YjZhNTA0NTY4NWFiMzI4IiwiZW1haWwiOiJjY2MiLCJuYW1lIjoiSGVucnkgQ2FzdGHDsWVkYSIsInBhc3N3b3JkIjoiJDJiJDEwJENUbXRpSVhZa0ZFTDgxZ1N2YkhSei5TSU5xaFYzdTBCQ2ptYTVBTHZXa2FTdnRZWHhJazB1IiwiZWxlY3Ryb2RvbWVzdGljcyI6W3sicm9sZSI6IkFETUlOIiwiX2lkIjoiNWM4M2Y2MjhhZGNiMzMwMzE4NWMwYzE0IiwiZWxlY3Ryb2RvbWVzdGljIjp7Il9pZCI6IjVjODNmNjI4YWRjYjMzMDMxODVjMGMxMiIsIm5hbWUiOiJsYW1wYXJhIG1lbG8ifX0seyJyb2xlIjoiQURNSU4iLCJfaWQiOiI1YzgzZjYyOGFkY2IzMzAzMTg1YzBjMTQiLCJlbGVjdHJvZG9tZXN0aWMiOnsiX2lkIjoiNWM4M2Y2MjhhZGNiMzMwMzE4NWMwYzEyIiwibmFtZSI6ImxhbXBhcmEgbWVsbyJ9fV0sIl9fdiI6MH0sImlhdCI6MTU1Mjk0ODk2NCwiZXhwIjoxNTUzMTIxNzY0fQ.WWr-cvPbREztXqYVAS5CsGwfkerJtbucNsScoSeaVFI'
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

    ngOnDestroy(): void {
        console.log('login destroy');
    }
}
