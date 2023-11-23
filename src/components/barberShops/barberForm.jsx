import { ArrowLeft, ArrowRight } from "react-feather";
import NavBar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useBarber } from "../../context/BarberContext";

function BarberForm() {
  const { user } = useAuth();
  const { searchBarbers } = useBarber(); 
  const { searchBarbers: searchBarbersData } = useBarber();
  const [barberShopsData, setBarberShopsData] = useState([]);
  const [grupoActual, setGrupoActual] = useState(1);

  console.log(searchBarbersData);

  const barberPorGrupo = 9;

  const inicioBarber = (grupoActual - 1) * barberPorGrupo;
  const barbersGrupo = barberShopsData.slice(
    inicioBarber,
    inicioBarber + barberPorGrupo
  );
  const totalGrupos = Math.ceil(barberShopsData.length / barberPorGrupo);

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
    <div className="flex justify-center items-center text-center">
      <div className="p-4" style={{ marginBottom: "100px" }}>
        <div className={barberShopsData.length > barberPorGrupo ? "" : ""}>
          <div className={barberPorGrupo === 0 ? className : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {barbersGrupo.map((barberShop) => (
              <div
                key={barberShop.id}
                className="p-4 bg-zinc-800 rounded-md shadow-md flex"
              >
                <div className="mr-4">
                  <img
                    src={barberShop.logo}
                    alt="Barber Shop Logo"
                    className="w-80 h-40 rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-orange-500">
                    {barberShop.name}
                  </p>
                  <p className="text-lg font-semibold">
                    {barberShop.createdAt}
                  </p>
                  <p className="text-gray-600">{barberShop.description}</p>
                  <a href="/barber-shop/:id">
                    <button className="bg-zinc-900 border border-orange-500 hover:bg-zinc-950 text-white px-2 py-1 rounded-md mt-4">
                      Ver mas...
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={grupoAnterior}
              disabled={grupoActual === 1}
              className="mr-2"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              onClick={siguienteGrupo}
              disabled={grupoActual === totalGrupos}
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default BarberForm;
