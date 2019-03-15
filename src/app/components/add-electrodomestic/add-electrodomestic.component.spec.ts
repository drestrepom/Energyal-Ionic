import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElectrodomesticPage } from './add-electrodomestic.page';

describe('AddElectrodomesticPage', () => {
  let component: AddElectrodomesticPage;
  let fixture: ComponentFixture<AddElectrodomesticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElectrodomesticPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElectrodomesticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
