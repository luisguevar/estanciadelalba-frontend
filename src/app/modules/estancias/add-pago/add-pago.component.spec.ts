import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagoComponent } from './add-pago.component';

describe('AddPagoComponent', () => {
  let component: AddPagoComponent;
  let fixture: ComponentFixture<AddPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPagoComponent]
    });
    fixture = TestBed.createComponent(AddPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
