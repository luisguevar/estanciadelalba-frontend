import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarLimpiezaComponent } from './gestionar-limpieza.component';

describe('GestionarLimpiezaComponent', () => {
  let component: GestionarLimpiezaComponent;
  let fixture: ComponentFixture<GestionarLimpiezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarLimpiezaComponent]
    });
    fixture = TestBed.createComponent(GestionarLimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
