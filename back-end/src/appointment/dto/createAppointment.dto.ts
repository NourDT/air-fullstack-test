import { IsNotEmpty } from "class-validator"

export class CreateAppointmentDto {
    @IsNotEmpty()
    id: string
    
    @IsNotEmpty()
    date: Date

    @IsNotEmpty()
    time: String;
}