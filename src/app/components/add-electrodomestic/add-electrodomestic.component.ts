import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {ElectrodomesticService} from '../../services/electrodomestic.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IElectrodomestic} from '../../interfaces/electrodomestic';
import {Alerts} from '../../../utils/alerts';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
    selector: 'app-add-electrodomestic',
    templateUrl: './add-electrodomestic.component.html',
    styles: []
})
export class AddElectrodomesticComponent implements OnInit {

    constructor(private router: Router,
                public alertController: AlertController,
                public loadingController: LoadingController,
                private sElectrodomestic: ElectrodomesticService,
                private toastController: ToastController,
<<<<<<< HEAD
                private barcodeScanner: BarcodeScanner) {
=======
                private alerts: Alerts) {
>>>>>>> 044b53823c2029c787e00dd24725b0f8e2e0799d
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
        if (this.forma.invalid) {
            this.alerts.presentAlertDanger();
            return;
        }
        this.alerts.presentLoading();
        const electrodomestic: IElectrodomestic = this.forma.value;
<<<<<<< HEAD
        // this.presentLoading();
        console.log('forma', this.forma.value);
        console.log('electrodomestic', electrodomestic);
=======
>>>>>>> 044b53823c2029c787e00dd24725b0f8e2e0799d
        this.sElectrodomestic.register(electrodomestic).subscribe(result => {
            this.alerts.coloseAlert();
            this.alerts.presentToast('Tu electrodoméstico ha sido registrado correctamente');
        }, error1 => {
            this.alerts.coloseAlert();
            let alert = '';
            if (typeof error1.error.error.errors !== 'undefined') {
                alert = error1.error.error.errors.serial.message;
            } else if (typeof error1.error.error !== 'undefined') {
                alert = error1.error.error;
            } else {
                alert = 'no se ha encontrado';
            }
            this.presentAlertFailed(alert);
        });
    }

    async presentAlertFailed(error) {
        const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Registro Fallido',
            message: error,
            buttons: [{
                text: 'OK'
            }]
        });
        await alert.present();
    }

<<<<<<< HEAD
    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Tu electrodoméstico ha sido registrado correctamente',
            duration: 2000
        });
        toast.present();
    }

    scan() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
           }).catch(err => {
               console.log('Error', err);
           });
    }

=======
>>>>>>> 044b53823c2029c787e00dd24725b0f8e2e0799d
}
