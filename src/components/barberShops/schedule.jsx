import React, { useState } from "react";
import Modal from "../common/Modal";
import { useBarber } from "../../context/BarberContext";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

function Schedule() {

  const params = useParams();
  const { getBarber, barber } = useBarber();

  useEffect(() => {
    getBarber(params.id);
  }, []);

  const [availability, setAvailability] = useState(generarIntervalosHorarios());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const intervaloUnaHora = 60 * 60 * 1000;

  function generarIntervalosHorarios() {
    const intervalos = [];
    const horarioInicio = 9;
    const horarioFin = 18;

    for (let hora = horarioInicio; hora <= horarioFin; hora++) {
      intervalos.push({
        time: `${hora}:00 AM - ${hora + 1}:00 PM`,
        available: true,
      });
    }

    return intervalos;
  }

  const handleButtonClick = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].available = !updatedAvailability[index].available;
    setAvailability(updatedAvailability);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
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
            <th className="border-b-2 border-orange-500 p-3 bg-zinc-800 text-center text-white">
              Disponibilidad
            </th>
          </tr>
        </thead>
        <tbody>
          {availability.map((slot, index) => (
            <tr key={index}>
              <td className="border-b-2 border-orange-500 p-3 text-center">
                {slot.time}
              </td>
              <td className="border-b-2 border-orange-500 p-3 text-center">
                {slot.available ? (
                  <button
                    onClick={() => handleButtonClick(index)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-all"
                  >
                    Disponible
                  </button>
                ) : (
                  <button
                    className="bg-zinc-950 text-white p-2 rounded-md"
                    disabled
                  >
                    Ocupado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
}

export default Schedule;
