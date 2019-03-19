import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoElctrodPage } from './info-elctrod.page';

describe('InfoElctrodPage', () => {
  let component: InfoElctrodPage;
  let fixture: ComponentFixture<InfoElctrodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoElctrodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoElctrodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
