import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprobantesComponent } from './listar-comprobantes.component';

describe('ListarComprobantesComponent', () => {
  let component: ListarComprobantesComponent;
  let fixture: ComponentFixture<ListarComprobantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarComprobantesComponent]
    });
    fixture = TestBed.createComponent(ListarComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
