import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReclamacionComponent } from './edit-reclamacion.component';

describe('EditReclamacionComponent', () => {
  let component: EditReclamacionComponent;
  let fixture: ComponentFixture<EditReclamacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReclamacionComponent]
    });
    fixture = TestBed.createComponent(EditReclamacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
