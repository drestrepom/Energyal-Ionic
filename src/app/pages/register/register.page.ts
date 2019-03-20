import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {IUser} from '../../interfaces/IUser';
import {
    AbstractControl,
    AsyncValidator,
    AsyncValidatorFn,
    FormControl,
    FormGroup, ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Validations} from '../../../utils/validations';
import {Alerts} from '../../../utils/alerts';

// @ts-ignore
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    forma: FormGroup;
    // @ts-ignore
    patterns = require('../../../assets/utils/validation.patterns.json');

    constructor(private userService: UserService,
                public alertController: AlertController,
                private router: Router,
                private loadingController: LoadingController,
                private http: HttpClient,
                private emailValidation: Validations,
                private alerts: Alerts) {
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
                    Validators.pattern(this.patterns.email),
                ], updateOn: 'blur',
                asyncValidators: []
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

    user: IUser = {
        name: null,
        email: null,
        password: null,
        city: null
    };
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    ngOnInit() {
        this.forma.reset();
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
    forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = nameRe.test(control.value);
            return forbidden ? {'forbiddenName': {value: control.value}} : null;
        };
    }

    emailExists(control: FormControl) {
        return this.userService.exists(control.value);
    }

    async presentAlertDanger() {
        const alert = await this.alertController.create({
            header: 'Alerta',
            message: 'Por favor complete todos los campos correctamente',
            buttons: ['Aceptar']
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

    register() {
        console.log(this.forma);
        if (this.forma.invalid) {
            this.presentAlertDanger();
        } else {
            this.alerts.presentLoading();
            this.userService.register(this.forma.value).subscribe(result => {
                this.alerts.coloseAlert();
                this.alerts.presentToast('Registro exitoso');
            }, error => {
                this.alerts.coloseAlert();
                this.presentAlertFailed(error);
            });
        }

    }
}
