import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Route, Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {load} from '@angular/core/src/render3';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    constructor(private sUser: UserService, public alertController: AlertController, private router: Router) {
    }

    user: User = {
        name: null,
        email: null,
        password: null,
        city: null
    };
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    ngOnInit() {
    }

    async presentAlertOk() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'Registro exitoso',
            buttons: [{
                text: 'OK',
                handler: (blah) => {
                    this.router.navigate(['/login']);
                }
            }]
        });

        await alert.present();
    }
    async loading() {
        const alert = await this.alertController.create({
            header: 'Cargando',
            message: '<ion-spinner style="text-align: center"></ion-spinner>',
        });
        await alert.present();
    }
    async presentAlertFailed(error) {
        console.log(error.error.error.message);
        const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Registro Fallido',
            message: error.error.error.message,
            buttons: [{
                text: 'OK'
            }]
        });
        await alert.present();
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Confirmar!',
            message: '<strong>Confirme su registro</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.loading();
                        this.sUser.register(this.user).subscribe(result => {
                            this.alertController.dismiss();
                            this.presentAlertOk();
                        }, error => {
                            this.alertController.dismiss();
                            this.presentAlertFailed(error);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    register(form) {
        console.log('user', this.user);
        this.presentAlertConfirm();
    }
}
