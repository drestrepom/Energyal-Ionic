import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/IUser';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    myUser: IUser = this.userService.user.user;

    constructor(private userService: UserService,
                private  alertController: AlertController,
                private toastController: ToastController) {
        console.log('usercomponent', userService.user.user);
    }

    ngOnInit() {
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
                    name: 'pass',
                    type: 'password',
                    placeholder: 'Contraseña'
                },
            ],
            buttons: [
                {
                    text: 'Aceptar',
                    handler: (data) => {
                        this.alertController.dismiss();
                        this.userService.challengPassword(data.pass).then(value => {
                            this.presentToast();
                        });
                        console.log(data.name);
                    }
                }
            ]
        });
        alert.present();
        return alert;
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Tu contraseña ha sido cambiada correctamente',
            duration: 2000
        });
        toast.present();
    }
}
