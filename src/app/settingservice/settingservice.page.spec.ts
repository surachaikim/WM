import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingservicePage } from './settingservice.page';

describe('SettingservicePage', () => {
  let component: SettingservicePage;
  let fixture: ComponentFixture<SettingservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
