import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitacionComponent } from './edit-habitacion.component';

describe('EditHabitacionComponent', () => {
  let component: EditHabitacionComponent;
  let fixture: ComponentFixture<EditHabitacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHabitacionComponent]
    });
    fixture = TestBed.createComponent(EditHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
