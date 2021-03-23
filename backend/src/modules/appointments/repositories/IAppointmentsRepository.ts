import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from './../dtos/ICreateAppointmentDTO';
interface IAppointmentsRespository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRespository;
