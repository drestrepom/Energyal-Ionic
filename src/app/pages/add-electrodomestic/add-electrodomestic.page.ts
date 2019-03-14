import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Electrodomestic} from '../../interfaces/electrodomestic';
import {ElectrodomesticService} from '../../services/electrodomestic.service';

@Component({
    selector: 'app-add-electrodomestic',
    templateUrl: './add-electrodomestic.page.html',
    styleUrls: ['./add-electrodomestic.page.scss'],
})
export class AddElectrodomesticPage implements OnInit {
    forma: FormGroup;

    constructor(private router: Router, public alertController: AlertController, public loadingController: LoadingController, private sElectrodomestic: ElectrodomesticService) {
    }

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
        const electrodomestic: Electrodomestic = this.forma.value;
        this.presentLoading();
        console.log('forma', this.forma.value);
        console.log('electrodomestic', electrodomestic);
        this.sElectrodomestic.register(electrodomestic).subscribe(result => {
            this.loadingController.dismiss();
            this.presentAlertOk();
        }, error1 => {
            this.loadingController.dismiss();
            this.presentAlertFailed(error1);
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Cargando',
            duration: 2000
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
}
