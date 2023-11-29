import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBarber } from "../../context/BarberContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getBarberReviewsRequest,
  createReviewRequest,
} from "../../api/reviews";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import{Toaster, toast} from 'sonner';

import {
  faEnvelope,
  faPhone,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Services() {
  const params = useParams();
  const { user } = useAuth();
  const { getBarber, barber } = useBarber();

  const [activeSection, setActiveSection] = useState("services");
  const [reviews, setReviews] = useState([]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    getBarber(params.id);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    const fetchReviews = async () => {
      console.log(barber._id);
      try {
        const response = await getBarberReviewsRequest(barber._id);
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [barber._id]);

  const intervaloUnaHora = 60 * 60 * 1000;

  const obtenerIntervalosUnaHora = (horario) => {
    const [inicio, fin] = horario.split(" - ");
    const inicioHora = new Date(`01/01/2023 ${inicio}`).getTime();
    const finHora = new Date(`01/01/2023 ${fin}`).getTime();

    const intervalos = [];
    for (let hora = inicioHora; hora < finHora; hora += intervaloUnaHora) {
      const horaActual = new Date(hora);
      const horaFormateada = horaActual.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      intervalos.push(horaFormateada);
    }

    return intervalos;
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log(barber.name); 
    const realValues = {
      ...values,
      author: user.firstName + " " + user.lastName,
      barberName: barber.name,
    };
    const response = await createReviewRequest(barber._id, realValues);
    console.log(response.data);
    setReviews([...reviews, response.data]);
    toast.success("Reseña agregada correctamente");
  });

  return (
    <div className="p-8 flex flex-col lg:flex-row space-y-8 lg:space-x-8">
      <div className="flex flex-col items-center relative bg-zinc-950 border border-zinc-800 rounded-lg w-80  mt-8">
        <h1 className="text-2xl text-center font-semibold mb-4 text-orange-500 mt-4">
          Información
        </h1>
        <nav>
          <ul className="flex space-x-4 mb-2">
            <li>
              <button
                onClick={() => handleSectionChange("services")}
                className={`hover:text-orange-500 mt-8 border border-zinc-800 p-2 px-2 rounded-lg ${
                  activeSection === "services" ? "active" : ""
                }`}
              >
                Servicios
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("schedule")}
                className={`hover:text-orange-500 mt-8 border border-zinc-800 p-2 px-2 rounded-lg ${
                  activeSection === "schedule" ? "active" : ""
                }`}
              >
                Horario
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("contact")}
                className={`hover:text-orange-500 mt-8 border border-zinc-800 p-2 px-2 rounded-lg ${
                  activeSection === "contact" ? "active" : ""
                }`}
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
        {activeSection === "services" && (
          <section>
            <h2 className="text-orange-500 mb-2">Servicios</h2>
            <ul>
              {barber.services &&
                barber.services.map((servicio, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex justify-between">
                      <span className="mr-4">{servicio.name}</span>
                      <span className="ml-4">${servicio.price}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        )}
        {activeSection === "schedule" && barber.workingDays && (
          <section>
            <h2 className="text-orange-500">Horario</h2>
            <ul>
              {barber.workingDays.schedule
                .split(",")
                .map((horarioItem, index) => (
                  <li key={index}>
                    {obtenerIntervalosUnaHora(horarioItem.trim()).map(
                      (intervalo, i, array) => (
                        <div key={i} className="mb-2">
                          {`${intervalo} a ${array[i + 1]}`}
                        </div>
                      )
                    )}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {activeSection === "contact" && barber.contact && (
          <section>
            <h2 className="text-orange-500 text-center">Contacto</h2>
            <div>
              <div className="mb-2">
                <div className="flex justify-between mr-3 ml-3  ">
                  <span className="mr-4">Teléfono:</span>
                  <span className="ml-4">{barber.contact.phone}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mr-3 ml-3">
                  <span className="mr-4">Correo electrónico:</span>
                  <span className="ml-4">{barber.contact.email}</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="flex flex-col items-center lg:items-start relative bg-zinc-950 border border-zinc-800 rounded-lg p-4 shadow-md">
        <div className="reviews-container">
          <h1 className="text-2xl text-center font-semibold mb-4 text-orange-500">
            Reseñas
          </h1>
          <section className="max-h-80 overflow-y-auto">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-2xl bg-zinc-900 rounded-lg p-4 shadow-md mb-4 text-center">
                  ¡Déjanos una reseña!
                </p>{" "}
                <img
                  src="https://res.cloudinary.com/dn1ng7anm/image/upload/v1701120216/clients/pkrhf0nc0t2xoowzwffz.png"
                  alt="Barbero Reseñero"
                  className=""
                />
              </div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-lg p-6 shadow-md mb-4 w-60"
                >
                  <h1 className="text-white text-xl font-semibold">
                    {review.author}
                  </h1>
                  <h2 className="text-orange-500 font-semibold">
                    {review.title}
                  </h2>
                  <p className="text-white mt-2">{review.comment}</p>
                </div>
              ))
            )}
          </section>
        </div>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col items-center">
          <label htmlFor="tittle" className="block text-white mb-2">
            Título:
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Escribe el título"
            className="border rounded-md p-2 mb-2 bg-zinc-900 "
          />
          <label className="block text-white mb-2">Reseña:</label>
          <textarea
            type="text"
            {...register("comment", { required: true })}
            placeholder="Escribe la reseña"
            className="border rounded-md p-2 mb-2 bg-zinc-900 "
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md mt-3"
          >
            Agregar Reseña
          </button>
        </form>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}

export default Services;
