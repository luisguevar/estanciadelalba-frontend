import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHuespedReservasComponent } from './info-huesped-reservas.component';

describe('InfoHuespedReservasComponent', () => {
  let component: InfoHuespedReservasComponent;
  let fixture: ComponentFixture<InfoHuespedReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoHuespedReservasComponent]
    });
    fixture = TestBed.createComponent(InfoHuespedReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
