import React, { useState, useRef } from "react";
import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function BarberForm() {
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState(null);
  const [barberImages, setBarberImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const fileInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const addService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleImageInputChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setBarberImages([...barberImages, selectedImage]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...barberImages];
    updatedImages.splice(index, 1);
    setBarberImages(updatedImages);
  };

  const cities = [
    "Comitán de Domínguez",
    "Tuxtla Gutiérrez",
    "San Cristóbal de las Casas",
    "Tapachula",
    "Ocosingo",
    "Palenque",
    "Suchiapa",
    "Ocozocoautla de Espinosa",
    "Tonalá",
    "Villaflores",
    "Cintalapa de Figueroa",
    "Chiapa de Corzo",
    "Las Margaritas",
    "Berriozábal",
    "Venustiano Carranza",
    "Pichucalco",
    "Jiquipilas",
    "Arriaga",
  ];

  return (
    <section className="p-4 mx-auto max-w-md mt-6 text-center">
      <header>
        <img
          src="barhallaLogo.png"
          alt="Barhalla Logo"
          className="w-40 h-40 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-4">Registra tu Barbería</h2>
        <h3 className="font-semibold mb-4 text-orange-500">
          La mejor gestión para tu barbería
        </h3>
      </header>

      {step === 1 && (
        <form onSubmit={handleNextStep}>
          <div className="mb-4">
            <label htmlFor="barberName" className="block text-gray-300">
              Nombre de tu Barbería:
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder='Ej. "Bandidos Barbería"'
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300">
              Descripción corta:
            </label>
            <textarea
              type="text"
              {...register("description", { required: true })}
              placeholder="Descripción de tu barbería"
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-300">
              Ciudad:
            </label>
            <select
              {...register("locations.0.city", { required: true })}
              className="w-full border rounded-lg px-3 py-2 bg-zinc-950 overflow-auto"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-300">
              Calle:
            </label>
            <input
              type="text"
              {...register("street", { required: true })}
              placeholder="Ej. Calle de Ejemplo"
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="logo" className="block text-gray-300">
              Subir Logo:
            </label>
            <input
              type="file"
              {...register("logo", { required: true })}
              className="w-full border rounded-lg px-3 py-2 bg-transparent cursor-pointer"
            ></input>
          </div>

          {logo && (
            <img
              src={logo}
              alt="Logo Preview"
              className="w-24 h-24 mx-auto mb-4"
            />
          )}

          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg"
          >
            Siguiente Paso
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="workDays" className="block text-gray-300">
              Días de trabajo:
            </label>
            <input
              type="text"
              {...register("days", { required: true })}
              placeholder='Ej. "Lunes, Martes, Miércoles"'
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="workHours" className="block text-gray-300">
              Horario de trabajo:
            </label>
            <input
              type="text"
              {...register("schedule", { required: true })}
              placeholder='Ej. "8:00 AM - 6:00 PM"'
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="workHours" className="block text-gray-300"></label>
            {services.map((service, index) => (
              <div key={index}>
                <h2>Servicios:</h2>
                <input
                  type="text"
                  {...register("servicesName", { required: true })}
                  placeholder="Corte de cabello"
                  className="w-full border rounded-lg px-3 py-2 bg-transparent mb-4"
                />
                <input
                  type="number"
                  {...register("servicesPrice", { required: true })}
                  placeholder="$120"
                  className="w-full border rounded-lg px-3 py-2 bg-transparent mb-4"
                />
                {index === 0 ? null : (
                  <button
                    type="button"
                    className="border border-orange-500 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg mb-2 ml-5"
                    onClick={() => removeService(index)}
                  >
                    Eliminar Servicio
                  </button>
                )}
                {index === services.length - 1 && (
                  <button
                    type="button"
                    className="border hover-bg-zinc-900 text-white px-6 py-2 rounded-lg ml-5"
                    onClick={addService}
                  >
                    Agregar Servicio
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="barberImages" className="block text-gray-300 mb-4">
              Imágenes de la Barbería (máximo 4):
            </label>

            {barberImages.map((image, index) => (
              <div key={index} className="mb-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 inline-block mr-2"
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => removeImage(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}

            {barberImages.length < 4 && (
              <label className="w-full border rounded-lg ml-4 px-3 py-2 cursor-pointer bg-orange-500 text-white hover:bg-orange-600">
                Agregar Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageInputChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          <button
            onClick={handlePrevStep}
            className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg mr-4"
          >
            Atrás
          </button>
          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg ml-4"
          >
            Crear Barbería
          </button>
        </form>
      )}
      <div className="mt-20">
        <NavBar />
      </div>
    </section>
  );
}

export default BarberForm;
