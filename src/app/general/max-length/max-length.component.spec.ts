/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaxLengthComponent } from './max-length.component';

describe('MaxLengthComponent', () => {
  let component: MaxLengthComponent;
  let fixture: ComponentFixture<MaxLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
