import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReservaWebComponent } from './info-reserva-web.component';

describe('InfoReservaWebComponent', () => {
  let component: InfoReservaWebComponent;
  let fixture: ComponentFixture<InfoReservaWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoReservaWebComponent]
    });
    fixture = TestBed.createComponent(InfoReservaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
