import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Schedule from "../barberShops/schedule";
import NavBar from '../common/NavBar';
import { useAuth } from "../../context/AuthContext";
import { useBarber } from "../../context/BarberContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

 function CreAppointment() {
  const params = useParams();
  const { getBarber, barber } = useBarber();

  useEffect(() => {
    getBarber(params.id);
  }, []);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState('');
  const servicios = barber?.services || [];


  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <div className="p-4" style={{ marginBottom: '100px' }}>
      <h1>{params.id}</h1>
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
            {service.name}
          </option>
        ))}
      </select>
        </div>
      </main>
      <hr className="w-full mt-4 sm:mt-2 border-t-2 border-orange-500" />
      <Schedule />
      <NavBar />

    </div>
  );
}

export default CreAppointment;
