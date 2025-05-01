import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarReclamacionesComponent } from './gestionar-reclamaciones.component';

describe('GestionarReclamacionesComponent', () => {
  let component: GestionarReclamacionesComponent;
  let fixture: ComponentFixture<GestionarReclamacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarReclamacionesComponent]
    });
    fixture = TestBed.createComponent(GestionarReclamacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
