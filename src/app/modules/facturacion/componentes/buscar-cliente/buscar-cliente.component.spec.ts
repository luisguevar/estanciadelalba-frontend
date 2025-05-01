import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarClienteComponent } from './buscar-cliente.component';

describe('BuscarClienteComponent', () => {
  let component: BuscarClienteComponent;
  let fixture: ComponentFixture<BuscarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarClienteComponent]
    });
    fixture = TestBed.createComponent(BuscarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
