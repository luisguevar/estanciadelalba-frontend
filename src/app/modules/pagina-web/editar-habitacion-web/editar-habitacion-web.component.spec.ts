import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHabitacionWebComponent } from './editar-habitacion-web.component';

describe('EditarHabitacionWebComponent', () => {
  let component: EditarHabitacionWebComponent;
  let fixture: ComponentFixture<EditarHabitacionWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHabitacionWebComponent]
    });
    fixture = TestBed.createComponent(EditarHabitacionWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
