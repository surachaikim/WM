import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingService2Page } from './setting-service2.page';

describe('SettingService2Page', () => {
  let component: SettingService2Page;
  let fixture: ComponentFixture<SettingService2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingService2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingService2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
