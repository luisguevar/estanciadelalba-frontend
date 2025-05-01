import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagoRecepcionComponent } from './add-pago-recepcion.component';

describe('AddPagoRecepcionComponent', () => {
  let component: AddPagoRecepcionComponent;
  let fixture: ComponentFixture<AddPagoRecepcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPagoRecepcionComponent]
    });
    fixture = TestBed.createComponent(AddPagoRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
