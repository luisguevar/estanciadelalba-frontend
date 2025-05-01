import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptCancelacionesComponent } from './rpt-cancelaciones.component';

describe('RptCancelacionesComponent', () => {
  let component: RptCancelacionesComponent;
  let fixture: ComponentFixture<RptCancelacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptCancelacionesComponent]
    });
    fixture = TestBed.createComponent(RptCancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
