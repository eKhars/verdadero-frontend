import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../common/NavBar';
import { useBarber } from "../../context/BarberContext";
import { useParams } from "react-router-dom";
import Modal from "../common/Modal";

function CreAppointment() {
  const params = useParams();
  const { getBarber, barber } = useBarber();

  useEffect(() => {
    getBarber(params.id);
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState('');
  const servicios = barber?.services || [];
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const intervaloUnaHora = 60 * 60 * 1000;

  const obtenerIntervalosUnaHora = (horario) => {
    const [inicio, fin] = horario.split(' - ');
    const inicioHora = new Date(`01/01/2023 ${inicio}`).getTime();
    const finHora = new Date(`01/01/2023 ${fin}`).getTime();

    const intervalos = [];
    for (let hora = inicioHora; hora < finHora; hora += intervaloUnaHora) {
      const horaActual = new Date(hora);
      const horaFormateada = horaActual.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      intervalos.push(horaFormateada);
    }

    return intervalos;
  };

  return (
    <div className="p-4" style={{ marginBottom: '100px' }}>
      <header className="p-4 text-white text-center">
        <img src="/barhallaLogo.png" alt="Logo" className="h-40 w-40 mx-auto" />
        <h1 className="text-4xl text-orange-500 font-bold mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2">{barber.name}</h1>
        <hr className="w-full mt-4 sm:mt-2 border-t-2 border-orange-500" />
      </header>

      <main className="container mx-auto p-4 flex justify-center items-center">
        <div className="mr-8">
          <img src={barber.logo} alt="Barbería" className="mt-4 w-40 h-40 rounded-lg" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fecha" className="text-lg font-semibold text-gray-700 mb-2">Selecciona la fecha:</label>
          <DatePicker
            id="fecha"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="p-2 border border-gray-300 rounded-md bg-inherit"
          />

          <label htmlFor="servicios" className="text-lg font-semibold text-gray-700 mt-4 mb-2">Selecciona el servicio:</label>
          <select
            id="servicios"
            name="servicios"
            className="p-2 border border-gray-300 rounded-md bg-zinc-950"
            value={selectedService}
            onChange={handleServiceChange}
          >
            {servicios.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name} ${service.price}
              </option>
            ))}
          </select>
        </div>
      </main>
      <hr className="w-full mt-4 sm:mt-2 border-t-2 border-orange-500" />

      <div className="max-w-screen-md mx-auto">
        <h2 className="text-xl font-bold mt-4 mb-4 text-center text-orange-500">
          Horario
        </h2>
        <table className="w-full border-b-2 border-orange-500 mb-4 bg-zinc-950 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="border-b-2 border-orange-500 p-3 bg-zinc-800 text-center text-white">
                Hora
              </th>
            </tr>
          </thead>
          <tbody>
            {barber.workingDays && barber.workingDays.schedule.split(',').map((horarioItem, index) => (
              <tr key={index}>
                <td className="border-b-2 border-orange-500 p-3 text-center">
                  <div className="mb-2 flex flex-col items-center">
                    {obtenerIntervalosUnaHora(horarioItem.trim()).map((intervalo, i, array) => (
                      <div key={i} className="mb-2">
                        <span>{`${intervalo} a ${array[i + 1]}`}</span>
                        <button
                          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md ml-4"
                          onClick={() => {
                            setModalIsOpen(true);
                          }}
                        >
                          Agendar Cita
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalIsOpen} onClose={closeModal} servicio={selectedService} fecha={selectedDate.toDateString()}  />
      </div>

      <NavBar />
    </div>
  );
}

export default CreAppointment;
