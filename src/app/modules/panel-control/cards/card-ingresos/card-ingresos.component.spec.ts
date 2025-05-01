import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIngresosComponent } from './card-ingresos.component';

describe('CardIngresosComponent', () => {
  let component: CardIngresosComponent;
  let fixture: ComponentFixture<CardIngresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardIngresosComponent]
    });
    fixture = TestBed.createComponent(CardIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
