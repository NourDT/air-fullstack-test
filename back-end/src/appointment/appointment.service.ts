import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './repository/appointment.repository';


@Injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}

    async createAppoinment(createOrderDto: CreateAppointmentDto) {

        const createdOffer = await this.appointmentRepository
            .createAppointment(createOrderDto);

        return createdOffer;
    }

    async scan() {
        const appointments = await this.appointmentRepository.scan();
        return appointments;
    }

    async getAllAppointmentByDate(date) {
        const appointments = await this.appointmentRepository.getAllAppointmentsByDate(date);
        return appointments;
    }

}
