import { ArrowLeft, ArrowRight } from "react-feather";
import NavBar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useBarber } from "../../context/BarberContext";

function BarberForm() {
  const { user } = useAuth();
  const { searchBarbers } = useBarber();
  const { searchBarbers: searchBarbersData } = useBarber();
  // const [barberShopsData, setBarberShopsData] = useState([]);
  const [grupoActual, setGrupoActual] = useState(1);

  // console.log(searchBarbersData);

  const barberShopsData = [
    {
      id: 1,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700027/hpp0to92uusdmu0guz63.jpg",
      user: {
        name: "BarberShop1",
        
      },
    },
    {
      id: 2,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700123/eelwr6qbsmfra3jftipz.jpg",
      user: {
        name: "BarberShop2",
        
      },
    },
    {
      id: 3,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700141/hpy7slcdlbwkggd9xgyw.jpg",
      user: {
        name: "BarberShop3",
        
      },
    },
    {
      id: 4,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700158/njn8awxn1buwzot1skjm.jpg",
      user: {
        name: "BarberShop4",
        
      },
    },
    {
      id: 5,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700158/njn8awxn1buwzot1skjm.jpg",
      user: {
        name: "BarberShop5",
        
      },
    },
    {
      id: 6,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700223/qxd8b4yhrnnoizgzztdb.jpg",
      user: {
        name: "BarberShop6",
        
      },
    },
    {
      id: 7,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700246/plwquexnd7q69zto7pj6.jpg",
      user: {
        name: "BarberShop7",
        
      },
    },
    {
      id: 8,
      description:
        "lorem ipsum tempor incididunt ut labore et dolore magna aliqua.",
        logo: "https://res.cloudinary.com/dn1ng7anm/image/upload/v1700700267/yjw7mrh8txza1agujefv.jpg",
      user: {
        name: "BarberShop8",
        
      },
    },
  ];

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
          <div
            className={
              barberPorGrupo === 0
                ? className
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            }
          >
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
