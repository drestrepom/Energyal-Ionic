import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  appMenu = [
    {title: 'Home.', url: 'principal', icon: 'home'},
    {title: 'Add Disp.', url: 'add-electrodomestic', icon: 'list'},
    {title: 'Usuario', url: 'user', icon: 'contact'},
    {title: 'Salir', url: '/login', icon: 'list'}
  ];
  constructor() { }

  ngOnInit() {}

}
