import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddPage } from './addd.page';

describe('AdddPage', () => {
  let component: AdddPage;
  let fixture: ComponentFixture<AdddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
