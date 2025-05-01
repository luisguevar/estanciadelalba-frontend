import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarReservasComponent } from './gestionar-reservas.component';

describe('GestionarReservasComponent', () => {
  let component: GestionarReservasComponent;
  let fixture: ComponentFixture<GestionarReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarReservasComponent]
    });
    fixture = TestBed.createComponent(GestionarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
