import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import { createAppointmentRequest } from "../../api/appointments";

function SuccessPage() {
  const [appointmentCreated, setAppointmentCreated] = useState(false);

  useEffect(() => {
    const createAppointment = async () => {
      if (!appointmentCreated && localStorage.getItem("appointmentData")) {
        const storedAppointmentData = JSON.parse(
          localStorage.getItem("appointmentData")
        );
        await createAppointmentRequest(storedAppointmentData);
        localStorage.removeItem("appointmentData");
        setAppointmentCreated(true);
        console.log("Cita creada");
      } else {
        window.location.href = "/";
      }
    };

    createAppointment();
  }, [appointmentCreated]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <header>
        <img
          src="/barhallaLogo.png"
          alt="Imagen de Barhalla"
          className="w-60 h-60"
        />
      </header>
      <section>
        <img
          src="/vikingo17.png"
          alt="Imagen de Vikingo"
          className="mb-6 mt-[-40px] max-w-1/2"
        />
      </section>
      <article className="bg-zinc-900 p-8 rounded-lg text-center h-auto w-auto">
        <h1 className="text-2xl font-bold mb-4">Pago realizado exitosamente</h1>
        <button className="bg-orange-500 hover-bg-orange-700 text-white font-bold py-2 px-4 rounded">
          <a href="/">Volver</a>
        </button>
      </article>
      <NavBar />
    </main>
  );
}

export default SuccessPage;
