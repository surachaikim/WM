import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpinPage } from './addpin.page';

describe('AddpinPage', () => {
  let component: AddpinPage;
  let fixture: ComponentFixture<AddpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
