import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptEstadoHabitacionComponent } from './rpt-estado-habitacion.component';

describe('RptEstadoHabitacionComponent', () => {
  let component: RptEstadoHabitacionComponent;
  let fixture: ComponentFixture<RptEstadoHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptEstadoHabitacionComponent]
    });
    fixture = TestBed.createComponent(RptEstadoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
