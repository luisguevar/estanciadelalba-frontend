import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIngresoReservaComponent } from './registrar-ingreso-reserva.component';

describe('RegistrarIngresoReservaComponent', () => {
  let component: RegistrarIngresoReservaComponent;
  let fixture: ComponentFixture<RegistrarIngresoReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarIngresoReservaComponent]
    });
    fixture = TestBed.createComponent(RegistrarIngresoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
