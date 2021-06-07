import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import * as mtz from 'moment-timezone';
import { APIService, CreateAppointmentInput } from 'src/app/API.service';
import { Timeslot } from 'src/app/classes/timeslot';
import { ApiGWService } from 'src/app/services/api-gw.service';

@Component({
  selector: 'app-confirmappointment',
  templateUrl: './confirmappointment.component.html',
  styleUrls: ['./confirmappointment.component.scss'],
})
export class ConfirmappointmentComponent implements OnInit {
  @ViewChild('apptDialog') apptDialog!: TemplateRef<any>;

  //HARDCODED ITEMS
  validStartTime = '13:00';
  validEndTime = '16:00';
  data: any;
  today: Date;
  selectedDate: any;
  userId: any;
  duration: any;
  availableTimezones: any;
  eventName: any;
  availableTimeSlots: any[] = [];
  bookedTimeSlots: Timeslot[] = [
    { startTime: '13:00', endTime: '14:20', duration: 80 },
    { startTime: '15:50', endTime: '16:00', duration: 10 },
  ];
  timezone: any;
  OnCreateApptSubscription: any;
  bookingresult: any;
  constructor(
    private route: ActivatedRoute,
    private api: APIService,
    private dialog: MatDialog,
    private apigw: ApiGWService
  ) {
    this.today = new Date();
    this.availableTimezones = mtz.tz.names();
    this.timezone = mtz.tz.guess(true);
    this.eventName = 'Event name here';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.duration = params['duration'];
      console.log(this.duration);
      console.log(this.userId);
    });

    this.OnCreateApptSubscription =
      this.api.OnCreateAppointmentListener.subscribe((appt) => {
        console.log(appt);
        let newAppt = JSON.parse(
          JSON.stringify(appt.value.data)
        ).onCreateAppointment;
        //If created appt is same date as currently displayed dates, update the available times again
        if (this.selectedDate === newAppt.date) {
          this.bookedTimeSlots.push({
            startTime: newAppt.startTime,
            endTime: newAppt.endTime,
            duration: newAppt.duration,
          });
          this.availableTimeSlots = this.generateTimeslotsBetweenTwoTimes(
            this.validStartTime,
            this.validEndTime,
            this.duration
          );
        }
      });
  }

  disableWeekend(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  async onSelect(event: any) {
    this.selectedDate = moment(event).format('YYYY-MM-DD');
    let response = await this.apigw.getBookedAppts(this.selectedDate);
    this.bookedTimeSlots = response.data.timeSlots;
    this.validStartTime = response.data.validStartTime;
    this.validEndTime = response.data.validEndTime;
    this.availableTimeSlots = this.generateTimeslotsBetweenTwoTimes(
      this.validStartTime,
      this.validEndTime,
      this.duration
    );
  }

  checkBookedSlots(slotTime: moment.Moment, bookedSlots: Timeslot[]) {
    return bookedSlots.some((slot: Timeslot) => {
      return (
        slotTime >= moment(slot.startTime, 'HH:mm') &&
        slotTime < moment(slot.endTime, 'HH:mm')
      );
    });
  }

  generateTimeslotsBetweenTwoTimes(
    startTime: string,
    endTime: string,
    durationInMin: number,
    checkInterval = 10
  ) {
    let availableTimeSlots = [];
    let loopStart = moment(startTime, 'HH:mm');
    let loopEnd = moment(endTime, 'HH:mm');
    while (loopStart < loopEnd) {
      if (
        !this.checkBookedSlots(loopStart, this.bookedTimeSlots) &&
        moment(loopStart, 'HH:mm').add(durationInMin, 'minutes') < loopEnd
      ) {
        let slot: Timeslot = {
          startTime: loopStart.format('HH:mm'),
          endTime: moment(loopStart)
            .add(durationInMin, 'minutes')
            .format('HH:mm'),
          duration: durationInMin,
        };
        availableTimeSlots.push(slot);
      }
      //Check every X mins if a slot would fit, default 10
      loopStart.add(checkInterval, 'minutes');
    }
    return availableTimeSlots;
  }

  async bookSlot(timeslot: Timeslot) {
    console.log(timeslot);
    let appt: CreateAppointmentInput = {
      candidateId: this.userId,
      eventName: this.eventName,
      timezone: this.timezone,
      date: this.selectedDate,
      startTime: timeslot.startTime,
      endTime: timeslot.endTime,
      duration: timeslot.duration,
    };
    console.log(JSON.stringify(appt));
    try {
      this.bookingresult = await this.api.CreateAppointment(appt);
      this.dialog.open(this.apptDialog);
    } catch (error) {}
  }
}
