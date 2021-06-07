import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { response } from '../classes/response';
import { Timeslot } from '../classes/timeslot';

@Injectable({
  providedIn: 'root',
})
export class ApiGWService {
  constructor(private http: HttpClient) {}

  getBookedAppts(date: string): Promise<response> {
    let apiUrl = environment.api_url + '/getAppt';
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Api-Key': environment.api_key,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<response>(apiUrl, { date: date }, httpOptions)
      .toPromise();
  }
}
