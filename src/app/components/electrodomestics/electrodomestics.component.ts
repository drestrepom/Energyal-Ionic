import {Component, OnInit} from '@angular/core';
import {IElectrodomestic} from '../../interfaces/electrodomestic';
import {UserService} from '../../services/user.service';
import {InfoElctrodComponent} from '../info-elctrod/info-elctrod.component';
import {NavController} from '@ionic/angular';
import {ElectrodomesticService} from '../../services/electrodomestic.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-electrodomestics',
    templateUrl: './electrodomestics.component.html',
    styleUrls: ['./electrodomestics.component.scss'],
})
export class ElectrodomesticsComponent implements OnInit {
    electrodomestics = [];
    nums = [];

    constructor(private  userService: UserService,
                private  navController: NavController,
                private  electroService: ElectrodomesticService,
                private router: Router) {
        for (let i = 0; i <= 100; i++) {
            this.nums.push(i);
        }
        this.userService.getElectrodomestic().subscribe(value => {
            this.electrodomestics = value.electrodomestics;
        });
    }

    async ngOnInit() {
    }

    pushMoreInfo(id) {
        this.router.navigate(['home/info-electrod/', id]);
    }
}
