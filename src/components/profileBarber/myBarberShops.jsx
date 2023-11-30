import React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import NavBar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { useBarber } from "../../context/BarberContext";
import { Link } from "react-router-dom";

function myBarberShops() {
  const { getUserBarbers, userBarbers } = useBarber();
  const { user } = useAuth();

  useEffect(() => {
    getUserBarbers();
    console.log(userBarbers);
  }, []);

  const barberPorGrupo = 8;
  const [grupoActual, setGrupoActual] = useState(1);

  const inicioBarber = (grupoActual - 1) * barberPorGrupo;
  const barbersList = userBarbers.slice(
    inicioBarber,
    inicioBarber + barberPorGrupo
  );
  const totalGrupos = Math.ceil(userBarbers.length / barberPorGrupo);

  const siguienteGrupo = () => {
    if (grupoActual < totalGrupos) {
      setGrupoActual(grupoActual + 1);
    }
  };

  const grupoAnterior = () => {
    if (grupoActual > 1) {
      setGrupoActual(grupoActual - 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src="/barhallaLogo.png"
        alt="Barhalla Logo"
        className="w-48 h-48 mt-4"
      />
      <div className="p-2" style={{ marginBottom: "100px" }}>
        <div className="absolute top-6 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
        <h1 className="text-2xl font-bold mb-2 text-orange-500">
          Mis barberías
        </h1>
        <div className="absolute top-25 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
        <div className={userBarbers.length > barberPorGrupo ? "" : ""}>
          <div
            className={
              userBarbers.length === 0
                ? "my-8"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            }
          >
            {userBarbers.length === 0 ? (
              <div>
                <p className="text-gray-500 text-2xl bg-zinc-900 rounded-lg p-4 shadow-md mb-4 my-3">
                  ¡Uups, aún no tienes barberías registradas!
                </p>
                <img
                  src="https://res.cloudinary.com/dn1ng7anm/image/upload/v1700729166/uqqtnqmgdgolroox7hk5.png"
                  alt="Vikingo Imagen"
                  className="mx-auto"
                />
              </div>
            ) : (
              barbersList.map((barberShop) => (
                <div
                  key={barberShop._id}
                  className="p-2 my-3 w-60 bg-zinc-800 rounded-md shadow-md flex flex-col justify-center items-center"
                >
                  <img
                    src={barberShop.logo}
                    alt="Barber Shop Logo"
                    className="w-full md:w-28 md:h-28 rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <p className="text-sm font-semibold text-orange-500">
                      {barberShop.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {barberShop.description}
                    </p>
                    <div className="items-center flex justify-between ">
                      <Link to={`/my-barbers/edit/${barberShop._id}`}>
                        <button className="bg-zinc-900 border border-orange-500 hover:bg-zinc-950 text-white px-2 py-1 rounded-md mt-2">
                          Editar
                        </button>
                      </Link>
                      <Link to={`/payments/${barberShop._id}`}>
                        <button className="bg-zinc-900 border border-orange-500 hover:bg-zinc-950 text-white px-2 py-1 rounded-md mt-2">
                          Ver más
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={grupoAnterior}
              disabled={grupoActual === 1}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={siguienteGrupo}
              disabled={grupoActual === totalGrupos}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default myBarberShops;
