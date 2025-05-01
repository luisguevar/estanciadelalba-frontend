import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEstanciaComponent } from './info-estancia.component';

describe('InfoEstanciaComponent', () => {
  let component: InfoEstanciaComponent;
  let fixture: ComponentFixture<InfoEstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEstanciaComponent]
    });
    fixture = TestBed.createComponent(InfoEstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
