import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaComponent } from './limpieza.component';

describe('LimpiezaComponent', () => {
  let component: LimpiezaComponent;
  let fixture: ComponentFixture<LimpiezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LimpiezaComponent]
    });
    fixture = TestBed.createComponent(LimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
