import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptIngresosTipohabComponent } from './rpt-ingresos-tipohab.component';

describe('RptIngresosTipohabComponent', () => {
  let component: RptIngresosTipohabComponent;
  let fixture: ComponentFixture<RptIngresosTipohabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptIngresosTipohabComponent]
    });
    fixture = TestBed.createComponent(RptIngresosTipohabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
