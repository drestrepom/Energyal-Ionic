import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {ElectrodomesticService} from '../../services/electrodomestic.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IElectrodomestic} from '../../interfaces/electrodomestic';

@Component({
    selector: 'app-add-electrodomestic',
    templateUrl: './add-electrodomestic.component.html',
    styleUrls: ['./add-electrodomestic.component.scss'],
})
export class AddElectrodomesticComponent implements OnInit {

    constructor(private router: Router,
                public alertController: AlertController,
                public loadingController: LoadingController,
                private sElectrodomestic: ElectrodomesticService,
                private toastController: ToastController) {
    }

    forma: FormGroup;
    categorias = [
        'televisor',
        'video juegos',
        'computador',
        'estufa',
        'horno',
        'lavadora',
        'aire acondicionado',
        'ventilador',
        'microondas',
        'secador de pelo',
        'lámpara',
    ];

    ngOnInit() {
        this.forma = new FormGroup({
            'name': new FormControl('', [
                Validators.required,
                Validators.pattern('')
            ]),
            'serial': new FormControl('', [
                Validators.required,
                Validators.pattern('')]),
            'meter': new FormControl('', [
                Validators.required,
            ]),
            'voltage': new FormControl('', [
                Validators.required,
                Validators.max(240),
                Validators.min(5),
            ]),
            'category': new FormControl('')
        });
    }

    register() {
        const electrodomestic: IElectrodomestic = this.forma.value;
        this.presentLoading();
        console.log('forma', this.forma.value);
        console.log('electrodomestic', electrodomestic);
        this.sElectrodomestic.register(electrodomestic).subscribe(result => {
            this.loadingController.dismiss();
            this.presentToast();
        }, error1 => {
            this.loadingController.dismiss();
            this.presentAlertFailed(error1);
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Cargando'
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();

        console.log('Loading dismissed!');
    }

    async presentAlertOk() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'Registro exitoso',
            buttons: [{
                text: 'OK',
                handler: (blah) => {
                    this.router.navigate(['/home']);
                }
            }]
        });

        await alert.present();
    }

    async presentAlertFailed(error) {
        console.log(error);
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

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Tu electrodoméstico ha sido registrado correctamente',
            duration: 2000
        });
        toast.present();
    }

}
