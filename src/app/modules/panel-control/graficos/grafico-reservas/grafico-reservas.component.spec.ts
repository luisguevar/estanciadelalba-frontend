import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoReservasComponent } from './grafico-reservas.component';

describe('GraficoReservasComponent', () => {
  let component: GraficoReservasComponent;
  let fixture: ComponentFixture<GraficoReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoReservasComponent]
    });
    fixture = TestBed.createComponent(GraficoReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
