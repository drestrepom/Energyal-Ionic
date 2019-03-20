import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectrodomesticsPage } from './electrodomestics.page';

describe('ElectrodomesticsPage', () => {
  let component: ElectrodomesticsPage;
  let fixture: ComponentFixture<ElectrodomesticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectrodomesticsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectrodomesticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
