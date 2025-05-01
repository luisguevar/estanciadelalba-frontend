import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptEntradaSalidaComponent } from './rpt-entrada-salida.component';

describe('RptEntradaSalidaComponent', () => {
  let component: RptEntradaSalidaComponent;
  let fixture: ComponentFixture<RptEntradaSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptEntradaSalidaComponent]
    });
    fixture = TestBed.createComponent(RptEntradaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
