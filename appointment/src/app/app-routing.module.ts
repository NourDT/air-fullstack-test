import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmappointmentComponent } from './components/confirmappointment/confirmappointment.component';

const routes: Routes = [ { path: 'book-appointment', component: ConfirmappointmentComponent },
 { path: '',   redirectTo: '/book-appointment', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
