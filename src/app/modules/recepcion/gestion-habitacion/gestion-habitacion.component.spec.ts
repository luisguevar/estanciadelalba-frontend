import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHabitacionComponent } from './gestion-habitacion.component';

describe('GestionHabitacionComponent', () => {
  let component: GestionHabitacionComponent;
  let fixture: ComponentFixture<GestionHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionHabitacionComponent]
    });
    fixture = TestBed.createComponent(GestionHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
