import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHuespedComponent } from './add-huesped.component';

describe('AddHuespedComponent', () => {
  let component: AddHuespedComponent;
  let fixture: ComponentFixture<AddHuespedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHuespedComponent]
    });
    fixture = TestBed.createComponent(AddHuespedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
