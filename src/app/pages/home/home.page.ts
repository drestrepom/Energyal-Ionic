import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    title = '';

    constructor(private menuController: MenuController,
                private uService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.title = 'Home';
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
