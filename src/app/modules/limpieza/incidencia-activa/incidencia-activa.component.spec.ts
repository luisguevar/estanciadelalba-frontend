import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaActivaComponent } from './incidencia-activa.component';

describe('IncidenciaActivaComponent', () => {
  let component: IncidenciaActivaComponent;
  let fixture: ComponentFixture<IncidenciaActivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidenciaActivaComponent]
    });
    fixture = TestBed.createComponent(IncidenciaActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
