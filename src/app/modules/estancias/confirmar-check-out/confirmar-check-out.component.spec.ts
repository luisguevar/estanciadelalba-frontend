import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCheckOutComponent } from './confirmar-check-out.component';

describe('ConfirmarCheckOutComponent', () => {
  let component: ConfirmarCheckOutComponent;
  let fixture: ComponentFixture<ConfirmarCheckOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarCheckOutComponent]
    });
    fixture = TestBed.createComponent(ConfirmarCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
