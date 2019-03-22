import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Alerts {
    constructor(private  toastController: ToastController,
                private alertController: AlertController) {
    }

    // @ts-ignore
    async presentToast(message: string, duration ? = 2000) {
        const toast = await this.toastController.create({
            message,
            duration
        });
        toast.present();
    }

    async presentLoading() {
        const loading = await this.alertController.create({
            message: '<ion-spinner></ion-spinner> Cargando... ',
            animated: true
        });
        await loading.present();
    }

    async presentAlertDanger() {
        const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Por favor complete todos los campos correctamente',
            buttons: ['Aceptar']
        });

        await alert.present();
    }

    coloseAlert() {
        this.alertController.dismiss();
    }
}
