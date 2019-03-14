import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   appMenu = [
    {title: 'Add Disp.', url: '/add-electrodomestic', icon: 'list'},
    {title: 'Home.', url: '/principal', icon: 'list'},
    {title: 'Salir', url: '/login', icon: 'list'}
  ];
}
