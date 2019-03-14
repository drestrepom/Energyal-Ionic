import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    forma: FormGroup;
    // @ts-ignore
    patterns = require('../../../assets/utils/validation.patterns.json');

    constructor(private sUser: UserService, public alertController: AlertController, private router: Router, private loadingController: LoadingController) {
        this.forma = new FormGroup({
            'name': new FormControl(null, {
                validators: [
                    Validators.pattern(this.patterns.name),
                    // Validators.required
                ], updateOn: 'blur'
            }),
            'email': new FormControl('', {
                validators: [
                    // Validators.required,
                    Validators.pattern(this.patterns.email)
                ], updateOn: 'blur'
            }),
            'password': new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.pattern('^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$'),
                    Validators.minLength(8),
                    Validators.maxLength(16),
                ], updateOn: 'change'
            }),
            'city': new FormControl('', [
                Validators.required
            ])
        });
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

    // emailVerify(control: FormControl): Promise<any> | Observable<any> {
    //     return verifier.verify(control.value, function (err, info) {
    //         return new Promise(((resolve, reject) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve({valid: info.success});
    //             }
    //         }));
    //     });
    // }


    emailExists(control: FormControl) {
        return this.sUser.exists(control.value);
    }

    async presentAlertDanger() {
        const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Por favor complete todos los campos correctamente',
            buttons: ['Aceptar']
        });

        await alert.present();
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

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Cargando',
            duration: 2000
        });
        await loading.present();
        console.log('Loading dismissed!');
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

    register() {
        // this.sUser.exists(this.forma.controls.email.value).subscribe(value => {
        //     console.log('valor', value);
        // });
        // console.log(this.exx(this.forma.controls.email.value));
        console.log(this.forma);
        if (this.forma.invalid) {
            this.presentAlertDanger();
        } else {
            this.presentLoading();
            this.sUser.register(this.forma.value).subscribe(result => {
                this.loadingController.dismiss();
                this.presentAlertOk();
            }, error => {
                this.loadingController.dismiss();
                this.presentAlertFailed(error);
            });
        }

    }
}
