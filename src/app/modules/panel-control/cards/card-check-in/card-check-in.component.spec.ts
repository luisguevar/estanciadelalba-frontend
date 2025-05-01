import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCheckInComponent } from './card-check-in.component';

describe('CardCheckInComponent', () => {
  let component: CardCheckInComponent;
  let fixture: ComponentFixture<CardCheckInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCheckInComponent]
    });
    fixture = TestBed.createComponent(CardCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
