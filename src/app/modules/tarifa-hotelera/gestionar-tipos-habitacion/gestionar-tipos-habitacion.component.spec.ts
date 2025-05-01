import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTiposHabitacionComponent } from './gestionar-tipos-habitacion.component';

describe('GestionarTiposHabitacionComponent', () => {
  let component: GestionarTiposHabitacionComponent;
  let fixture: ComponentFixture<GestionarTiposHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarTiposHabitacionComponent]
    });
    fixture = TestBed.createComponent(GestionarTiposHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
