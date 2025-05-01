import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptHuespedResponsableComponent } from './rpt-huesped-responsable.component';

describe('RptHuespedResponsableComponent', () => {
  let component: RptHuespedResponsableComponent;
  let fixture: ComponentFixture<RptHuespedResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RptHuespedResponsableComponent]
    });
    fixture = TestBed.createComponent(RptHuespedResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
