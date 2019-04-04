import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {SocketService} from '../../services/socket.service';

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
                public loadingController: LoadingController,
                private soketService: SocketService) {
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
<<<<<<< HEAD
                this.router.navigate(['/home/home']);
=======
                this.router.navigate(['/home/index']);
>>>>>>> 044b53823c2029c787e00dd24725b0f8e2e0799d
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
        this.soketService.getSaludo('jejejeje');
        const user = {
            'ok': true,
            'user': {
                'city': 'Yarumal',
                '_id': '5c96d0a3b044e21cc8b1c893',
                'name': 'Diego Restrepo',
                'email': 'restrepomesadiego@gmail.com',
                'password': '$2b$10$8.p83J4e18KdrcvOOLgfY.ov6Tme46mD7ml9uIn5DzZ5QLnUcyDny'
            },
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNpdHkiOiJZYXJ1bWFsIiwiX2lkIjoiNWM5NmQwYTNiMDQ0ZTIxY2M4YjFjODkzIiwibmFtZSI6IkRpZWdvIFJlc3RyZXBvIiwiZW1haWwiOiJyZXN0cmVwb21lc2FkaWVnb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ4LnA4M0o0ZTE4S2RyY3ZPT0xnZlkub3Y2VG1lNDZtRDdtbDl1SW41RHpaNVFMblVjeURueSJ9LCJpYXQiOjE1NTM1NDg4NDUsImV4cCI6MTU1MzU5MjA0NX0.YXpJyBIK6g5q52FHSTpbISezPwHDQjpgh5Wce60ANbY'
        };
        this.sUser.user = user;
        this.router.navigate(['/home/index']);
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
