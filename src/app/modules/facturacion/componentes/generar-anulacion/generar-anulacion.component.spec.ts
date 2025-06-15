import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAnulacionComponent } from './generar-anulacion.component';

describe('GenerarAnulacionComponent', () => {
  let component: GenerarAnulacionComponent;
  let fixture: ComponentFixture<GenerarAnulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarAnulacionComponent]
    });
    fixture = TestBed.createComponent(GenerarAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
