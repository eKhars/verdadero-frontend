import React, { useState, useRef } from "react";
import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function BarberForm() {
  const [step, setStep] = useState(1);

  const [services, setServices] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();

  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });


  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  ;

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
          src="/barhallaLogo.png"
          alt="Barhalla Logo"
          className="w-40 h-40 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-4">Editar datos de la Barberia</h2>
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
              {...register("name", {
                required: {
                  value: true,
                  message: 'Nombre invalido'
                },
                maxLength: {
                  value: 30,
                  message: 'Maximo 30 caracteres'
                }
              })}
              placeholder='Ej. "Bandidos Barbería"'
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
            />
            {
              errors.name && <span className="text-red-500">{errors.name.message}</span>
            }


          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300">
              Descripción corta:
            </label>
            <textarea
              type="text"
              {...register("description", {
                required: {
                  value: true,
                  message: 'Descripcion requerida'
                },
                minLength: {
                  value: 20,
                  message: 'Minimo 10 caracteres'
                },
                maxLength: {
                  value: 100,
                  message: 'Maximo 100 caracteres'
                }
              },
              )}
              placeholder="Descripción de tu barbería"
              className="w-full border rounded-lg px-3 py-2 bg-transparent"
              rows="3"
            />
            {
              errors.description && <span className="text-red-500">{errors.description.message}</span>
            }
          </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-300">
          Ciudad:
        </label>
        <input
          type="text"
          {...register("location.city", { required: true })}
          className="w-full border rounded-lg px-3 py-2 bg-zinc-950 overflow-auto"
          placeholder="Ej. Tuxtla Gutiérrez"
        />
        {errors["location.city"] && (
          <span className="text-red-500">Ciudad requerida</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="street" className="block text-gray-300">
          Calle:
        </label>
        <input
          type="text"
          {...register("location.street", { required: true })}
          className="w-full border rounded-lg px-3 py-2 bg-transparent"
          placeholder="Ej. 1a Poniente Norte"
        />
        {errors["location.street"] && (
          <span className="text-red-500">Calle requerida</span>
        )}
      </div>


      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-300">
          Teléfono:
        </label>
        <input
          type="text"
          {...register("contact.phone", { required: true })}
          placeholder="9613272138"
          className="w-full border rounded-lg px-3 py-2 bg-transparent"
        />
        {errors["contact.phone"] && (
          <span className="text-red-500">Teléfono requerido</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300">
          Email:
        </label>
        <input
          type="email"
          {...register("contact.email", { required: true })}
          placeholder="barhalla@correo.com"
          className="w-full border rounded-lg px-3 py-2 bg-transparent"
        />
        {errors["contact.email"] && (
          <span className="text-red-500">Email requerido</span>
        )}
      </div>

          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg"
          >
            Siguiente Paso
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onSubmit}>
          
    <div className="mb-4">
      <label htmlFor="workDays" className="block text-gray-300">
        Días de trabajo:
      </label>
      <input
        type="text"
        {...register("workingDays.days", { required: true })}
        placeholder='Ej. "Lunes, Martes, Miércoles"'
        className="w-full border rounded-lg px-3 py-2 bg-transparent"
      />
      {errors["workingDays.days"] && (
        <span className="text-red-500">Dias invalidos</span>
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="workHours" className="block text-gray-300">
        Horario de trabajo:
      </label>
      <input
        type="text"
        {...register("workingDays.schedule", { required: true })}
        placeholder='Ej. "8:00 AM - 6:00 PM"'
        className="w-full border rounded-lg px-3 py-2 bg-transparent"
      />
      {errors["workingDays.schedule"] && (
        <span className="text-red-500">Horario invalido</span>
      )}
    </div>

        
    <div className="mb-4">
      <label htmlFor="services" className="block text-gray-300">
        Servicios:
      </label>
      {fields.map((servicio, index) => (
        <div key={servicio.id} className="mb-4">
          <input
            type="text"
            {...register(`services.${index}.name`, {
              required: "Nombre del servicio requerido",
            })}
            placeholder="Corte de cabello"
            className="w-full border rounded-lg px-3 py-2 bg-transparent mb-2"
          />
          {errors.services?.[index]?.name && (
            <span className="text-red-500">
              {errors.services[index].name.message}
            </span>
          )}

          <input
            type="number"
            {...register(`services.${index}.price`, {
              required: "Precio del servicio requerido",
            })}
            placeholder="$120"
            className="w-full border rounded-lg px-3 py-2 bg-transparent"
          />
          {errors.services?.[index]?.price && (
            <span className="text-red-500">
              {errors.services[index].price.message}
            </span>
          )}

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg ml-4 mt-4"
            >
              Eliminar Servicio
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", price: "" })}
        className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-lg"
      >
        Agregar Servicio
      </button>
    </div>


          <div className="mb-4">
            <label htmlFor="logo" className="block text-gray-300">
              Subir Logo:
            </label>
            <input
              type="file" onChange={(e) => {
                console.log(e.target.files[0])
                setValue("logo", e.target.files[0].name)
              }
              }
              className="w-full border rounded-lg px-3 py-2 bg-transparent cursor-pointer"
            >
            </input>
          </div>
{/* 
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-300">
              Subir imágenes de la barbería:
            </label>

            {[1, 2, 3, 4].map((index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setValue(`photo${index}`, e.target.files[0].name);
                }}
                className="w-full border rounded-lg px-3 py-2 bg-transparent cursor-pointer"
              />
            ))}
          </div> */}

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
          {/* '  {JSON.stringify(watch(), null, 2)}' */}
        </form>
      )}
      <div className="mt-20">
        <NavBar />
      </div>
    </section>
  );
}


export default BarberForm;
