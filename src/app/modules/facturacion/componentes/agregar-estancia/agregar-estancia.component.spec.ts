import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEstanciaComponent } from './agregar-estancia.component';

describe('AgregarEstanciaComponent', () => {
  let component: AgregarEstanciaComponent;
  let fixture: ComponentFixture<AgregarEstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEstanciaComponent]
    });
    fixture = TestBed.createComponent(AgregarEstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
