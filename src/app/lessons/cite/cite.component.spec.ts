/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CiteComponent } from './cite.component';

describe('CiteComponent', () => {
  let component: CiteComponent;
  let fixture: ComponentFixture<CiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
