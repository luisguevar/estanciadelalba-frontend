import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEstanciasComponent } from './gestionar-estancias.component';

describe('GestionarEstanciasComponent', () => {
  let component: GestionarEstanciasComponent;
  let fixture: ComponentFixture<GestionarEstanciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarEstanciasComponent]
    });
    fixture = TestBed.createComponent(GestionarEstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
