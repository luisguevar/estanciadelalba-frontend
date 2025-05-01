import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHuespedEstanciasComponent } from './info-huesped-estancias.component';

describe('InfoHuespedEstanciasComponent', () => {
  let component: InfoHuespedEstanciasComponent;
  let fixture: ComponentFixture<InfoHuespedEstanciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoHuespedEstanciasComponent]
    });
    fixture = TestBed.createComponent(InfoHuespedEstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
