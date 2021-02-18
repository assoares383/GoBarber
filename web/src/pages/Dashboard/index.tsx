import React, { useState } from 'react';

import { useAuth } from '../../hooks/auth';

import { FiClock, FiPower } from 'react-icons/fi';

import {
  Appointment,
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Section,
  Schedule
} from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarver" />

          <Profile>
            <img src={user.avatar_url}
            alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>

          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src="https://avatars.githubusercontent.com/u/15836394?s=88&u=70673f20d41e1ee784577c36affb639d453a3552&v=4"
              alt="Alexandre Soares" />

              <strong>Alexandre Soares</strong>
              <span>
                <FiClock />
                08:00
              </span>

            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/15836394?s=88&u=70673f20d41e1ee784577c36affb639d453a3552&v=4"
                alt="Alexandre Soares" />

                <strong>Alexandre Soares</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/15836394?s=88&u=70673f20d41e1ee784577c36affb639d453a3552&v=4"
                alt="Alexandre Soares" />

                <strong>Alexandre Soares</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/15836394?s=88&u=70673f20d41e1ee784577c36affb639d453a3552&v=4"
                alt="Alexandre Soares" />

                <strong>Alexandre Soares</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/15836394?s=88&u=70673f20d41e1ee784577c36affb639d453a3552&v=4"
                alt="Alexandre Soares" />

                <strong>Alexandre Soares</strong>
              </div>
            </Appointment>
          </Section>

        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
}

export default Dashboard;
