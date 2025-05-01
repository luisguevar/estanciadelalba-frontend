import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptCambioHabitacionComponent } from './rpt-cambio-habitacion.component';

describe('RptCambioHabitacionComponent', () => {
  let component: RptCambioHabitacionComponent;
  let fixture: ComponentFixture<RptCambioHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptCambioHabitacionComponent]
    });
    fixture = TestBed.createComponent(RptCambioHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
