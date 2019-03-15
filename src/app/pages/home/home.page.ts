import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuController: MenuController) {}
   appMenu = [
    {title: 'Add Disp.', url: '/add-electrodomestic', icon: 'list'},
    {title: 'Home.', url: '/principal', icon: 'list'},
    {title: 'Salir', url: '/login', icon: 'list'}
  ];

  ngOnInit() {
  }
    toogleMenu() {
        this.menuController.toggle();
    }
}
