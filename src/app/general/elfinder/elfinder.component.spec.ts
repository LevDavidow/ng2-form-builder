/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElfinderComponent } from './elfinder.component';

describe('ElfinderComponent', () => {
  let component: ElfinderComponent;
  let fixture: ComponentFixture<ElfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
