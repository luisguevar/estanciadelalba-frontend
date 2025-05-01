import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarReportesComponent } from './gestionar-reportes.component';

describe('GestionarReportesComponent', () => {
  let component: GestionarReportesComponent;
  let fixture: ComponentFixture<GestionarReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarReportesComponent]
    });
    fixture = TestBed.createComponent(GestionarReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
