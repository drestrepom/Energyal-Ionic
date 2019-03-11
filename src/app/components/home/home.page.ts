import {Component} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private sUser: UserService, private router: Router, public alertController: AlertController) {
    }

    Usuario = {
        email: null,
        password: null
    };
    formLogin: FormControl;
    // @ts-ignore
    validation_messages = require('../../../assets/utils/validation.messages.json');

    login(forma: NgForm) {
        this.loading();
        // console.log('formulario Posteado');
        // console.log('ngForm', forma);
        // console.log('valor forma', forma.value);
        // console.log(this.Usuario);
        this.sUser.login({
            email: forma.value.email,
            password: forma.value.password
        }).subscribe(result => {
            this.alertController.dismiss();
            if (result.ok) {
                this.sUser.user = result;
                console.log('service', this.sUser.user);
                this.router.navigate(['/principal']);
            }
        }, error => {
            this.alertController.dismiss();
            this.loginFailed();
        });
    }

    async loading() {
        const alert = await this.alertController.create({
            header: 'Cargando',
            message: '<ion-spinner style="alignment: center"></ion-spinner>',
        });
        await alert.present();
    }

    async loginFailed() {
        // console.log(error.error.error.message);
        const alert = await this.alertController.create({
            header: 'Error!!',
            subHeader: 'Error al iniciar sesión',
            message: '<h3 color="danger">usuario o contraseña incorrectos</h3>',
            buttons: [{
                text: 'OK'
            }]
        });
        await alert.present();
    }
}
