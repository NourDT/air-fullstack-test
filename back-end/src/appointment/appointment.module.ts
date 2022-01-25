import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './repository/appointment.repository';

@Module({
  imports: [],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository]
})
export class AppointmentModule {}
