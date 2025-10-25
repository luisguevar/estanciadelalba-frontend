import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionNotaCreditoComponent } from './emision-nota-credito.component';

describe('EmisionNotaCreditoComponent', () => {
  let component: EmisionNotaCreditoComponent;
  let fixture: ComponentFixture<EmisionNotaCreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmisionNotaCreditoComponent]
    });
    fixture = TestBed.createComponent(EmisionNotaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
