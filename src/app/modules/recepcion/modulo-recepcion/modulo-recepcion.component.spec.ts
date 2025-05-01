import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloRecepcionComponent } from './modulo-recepcion.component';

describe('ModuloRecepcionComponent', () => {
  let component: ModuloRecepcionComponent;
  let fixture: ComponentFixture<ModuloRecepcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloRecepcionComponent]
    });
    fixture = TestBed.createComponent(ModuloRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
