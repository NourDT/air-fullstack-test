import { IsNotEmpty } from "class-validator"

export class GetAppointmentDto {
    @IsNotEmpty()
    appointmentDate: Date
}