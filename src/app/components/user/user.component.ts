import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/IUser';
import {AlertController, ToastController} from '@ionic/angular';
import {Alerts} from '../../../utils/alerts';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    myUser: IUser = this.userService.user.user;

    constructor(private userService: UserService,
                private  alertController: AlertController,
                private toastController: ToastController,
                private alerts: Alerts,
                public ThemeSwitcherService: ThemeSwitcherService) {
    }
public tgTheme: boolean;

    ngOnInit() {
    }

    tema() {
        if (this.tgTheme === false) {
            this.ThemeSwitcherService.setTheme('ligth');
        } else{
            this.ThemeSwitcherService.setTheme('dark');
        }
    }

    challeng() {
        this.presentAlert();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Cambio de contraseña',
            subHeader: 'Ingrese su nueva contraseña',
            inputs: [
                {
                    name: 'pass1',
                    type: 'password',
                    placeholder: 'Contraseña actual'
                },
                {
                    name: 'pass2',
                    type: 'password',
                    placeholder: 'Contraseña nueva',
                },
            ],
            buttons: [
                {
                    text: 'Aceptar',
                    handler: (data) => {
                        this.alertController.dismiss();
                        this.userService.challengPassword(data.pass1, data.pass2).then(value => {
                            if (value['ok']) {
                                this.alerts.presentToast('Contraseña cambiada');
                            } else {
                                this.alerts.presentToast('Contraseña incorrecta', 3000);
                            }
                        }).catch(reason => {

                        });
                    }
                }
            ]
        });
        alert.present();
        return alert;
    }
}
