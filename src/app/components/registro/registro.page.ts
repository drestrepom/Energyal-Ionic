import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
    constructor(private sUser: UserService) {
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

    register(form) {
        console.log('user', this.user);
        this.sUser.register(this.user).subscribe(result => {
            console.log(result);
        });
    }
}
