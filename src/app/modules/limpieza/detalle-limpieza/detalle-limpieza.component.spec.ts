import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLimpiezaComponent } from './detalle-limpieza.component';

describe('DetalleLimpiezaComponent', () => {
  let component: DetalleLimpiezaComponent;
  let fixture: ComponentFixture<DetalleLimpiezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLimpiezaComponent]
    });
    fixture = TestBed.createComponent(DetalleLimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
