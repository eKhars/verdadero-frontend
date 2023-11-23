import React from "react";
import { useState, useEffect } from "react";
import { useBarber } from "../../context/BarberContext";

function Search() {
  const { searchingBarbers } = useBarber();

  const [city, setCity] = useState("");

  const [name, setName] = useState("");

  const handleSearch = () => {
    searchingBarbers(city, name);
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
    <header className="flex flex-col items-center p-4 text-white">
      <div className="flex flex-col items-center mb-4 sm:mb-0 sm:flex-row sm:justify-center">
        <img
          src="/barhallaLogo.png"
          alt="Logo"
          className="h-32 w-32 mt-[-20px] sm:h-40 sm:w-40 mr-2"
        />
        <div className="flex flex-col items-center mt-2 sm:flex-row sm:items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-lg bg-zinc-900"
            />
            <button className="ml-2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <select className="p-2 border rounded-lg mt-2 sm:mt-0 sm:ml-2 text-white bg-zinc-900 lg:w-60 block sm:inline">
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Search;
