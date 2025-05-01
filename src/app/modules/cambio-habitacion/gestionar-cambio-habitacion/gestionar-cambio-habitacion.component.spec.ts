import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCambioHabitacionComponent } from './gestionar-cambio-habitacion.component';

describe('GestionarCambioHabitacionComponent', () => {
  let component: GestionarCambioHabitacionComponent;
  let fixture: ComponentFixture<GestionarCambioHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarCambioHabitacionComponent]
    });
    fixture = TestBed.createComponent(GestionarCambioHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
