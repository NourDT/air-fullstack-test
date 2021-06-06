import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmappointment',
  templateUrl: './confirmappointment.component.html',
  styleUrls: ['./confirmappointment.component.sass']
})
export class ConfirmappointmentComponent implements OnInit {
  today: Date;
  selectedDate: any;

  availableTimeSlots = []
  constructor(private route: ActivatedRoute) { this.today = new Date()}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      console.log(userId);
    });
  }

  disableWeekend (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  onSelect(event: any){
    this.selectedDate = event;
    console.log(this.selectedDate)
  }
}
