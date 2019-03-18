import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    title = 'Home';

    constructor(private menuController: MenuController, private uService: UserService) {
    }

    appMenu = [
        {title: 'Add Disp.', url: '/add-electrodomestic', icon: 'list'},
        {title: 'Home.', url: '/home', icon: 'list'},
        {title: 'Salir', url: '/login', icon: 'list'}
    ];

    ngOnInit() {
    }

    toggleMenu() {
        this.menuController.toggle();
    }

    setHeader(title) {
        this.title = title;
    }

    ngOnDestroy(): void {
        console.log('destroy home');
        this.uService.logOut();
    }
}
