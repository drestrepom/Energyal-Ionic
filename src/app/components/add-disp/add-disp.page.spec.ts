import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDispPage } from './add-disp.page';

describe('AddDispPage', () => {
  let component: AddDispPage;
  let fixture: ComponentFixture<AddDispPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDispPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDispPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
