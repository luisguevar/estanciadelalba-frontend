import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCheckOutComponent } from './card-check-out.component';

describe('CardCheckOutComponent', () => {
  let component: CardCheckOutComponent;
  let fixture: ComponentFixture<CardCheckOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCheckOutComponent]
    });
    fixture = TestBed.createComponent(CardCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
