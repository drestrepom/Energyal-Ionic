import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTimePage } from './r-time.page';

describe('RTimePage', () => {
  let component: RTimePage;
  let fixture: ComponentFixture<RTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
