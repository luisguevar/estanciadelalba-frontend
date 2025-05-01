import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPrecioTemporadaComponent } from './asignar-precio-temporada.component';

describe('AsignarPrecioTemporadaComponent', () => {
  let component: AsignarPrecioTemporadaComponent;
  let fixture: ComponentFixture<AsignarPrecioTemporadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarPrecioTemporadaComponent]
    });
    fixture = TestBed.createComponent(AsignarPrecioTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
