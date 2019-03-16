import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @Output() conponentSelected: EventEmitter<string>;
    appMenu = [
        {title: 'Add Disp.', url: 'add-electrodomestic', icon: 'list'},
        {title: 'Home.', url: 'principal', icon: 'list'},
        {title: 'Salir', url: '/login', icon: 'list'}
    ];

    constructor() {
        this.conponentSelected = new EventEmitter();
    }

    ngOnInit() {
    }

    selectComponent(title: string) {
        this.conponentSelected.emit(title);
    }

}
