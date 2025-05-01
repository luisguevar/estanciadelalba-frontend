import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCheckInComponent } from './confirmar-check-in.component';

describe('ConfirmarCheckInComponent', () => {
  let component: ConfirmarCheckInComponent;
  let fixture: ComponentFixture<ConfirmarCheckInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarCheckInComponent]
    });
    fixture = TestBed.createComponent(ConfirmarCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
