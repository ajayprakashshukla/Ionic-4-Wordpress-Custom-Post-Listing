import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglefeedPage } from './singlefeed.page';

describe('SinglefeedPage', () => {
  let component: SinglefeedPage;
  let fixture: ComponentFixture<SinglefeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglefeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglefeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
