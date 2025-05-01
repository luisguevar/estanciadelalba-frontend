import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarComprobanteComponent } from './generar-comprobante.component';

describe('GenerarComprobanteComponent', () => {
  let component: GenerarComprobanteComponent;
  let fixture: ComponentFixture<GenerarComprobanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarComprobanteComponent]
    });
    fixture = TestBed.createComponent(GenerarComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
