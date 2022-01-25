import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/createAppointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}
    getAllAppointmentByDate
    @Get('/')
    async getAll(@Res() res:any, @Query('date') date) {
        try {
            let appointment;
            if (date) {
                appointment = await this.appointmentService.getAllAppointmentByDate(date);
            } else {
                appointment = await this.appointmentService.scan()
            }
            
            if (appointment.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    appointment: appointment.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Order',
                });
            }

       } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            ok: false,
            message: 'Error Trying to reach DB',
            errors: error,
        });
       }
    }

    @Post('/')
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @Res() res:any) {
        try {
            // create appointment
            const newAppointment: any = await this.appointmentService.createAppoinment(createAppointmentDto);
            if (newAppointment.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    data: newAppointment.data,
                });
            } else {
            // show error when apointment is already scheduled
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: newAppointment.message,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
}
