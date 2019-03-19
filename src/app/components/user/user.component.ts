import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/IUser';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    myUser: IUser = this.userService.user.user;

    constructor(private userService: UserService) {
        console.log('usercomponent', userService.user.user);
    }

    ngOnInit() {
    }
}
