import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-disp',
  templateUrl: './add-disp.page.html',
  styleUrls: ['./add-disp.page.scss'],
})
export class AddDispPage implements OnInit {
  forma: FormGroup;
  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern('')
      ]),
      'serial': new FormControl('', [
          Validators.required,
      Validators.pattern('')])
    });
  }

}
