import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHuespedPagosComponent } from './info-huesped-pagos.component';

describe('InfoHuespedPagosComponent', () => {
  let component: InfoHuespedPagosComponent;
  let fixture: ComponentFixture<InfoHuespedPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoHuespedPagosComponent]
    });
    fixture = TestBed.createComponent(InfoHuespedPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
