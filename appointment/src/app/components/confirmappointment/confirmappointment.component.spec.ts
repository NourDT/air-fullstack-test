import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmappointmentComponent } from './confirmappointment.component';

describe('ConfirmappointmentComponent', () => {
  let component: ConfirmappointmentComponent;
  let fixture: ComponentFixture<ConfirmappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmappointmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
