import Appointment from '../infra/typeorm/entities/Appointments';

interface IAppointmentsRespository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRespository;
