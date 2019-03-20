import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Alerts {
    constructor(private  toastController: ToastController,
                private alertController: AlertController) {
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
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

    coloseAlert() {
        this.alertController.dismiss();
    }
}
