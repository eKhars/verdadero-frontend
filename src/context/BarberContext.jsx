import { createContext, useState, useContext } from "react";
import {
  getBarberRequest,
  getBarbersRequest,
  searchBarbersShopsRequest,
  createBarberRequest,
  updateBarberRequest,
  deleteBarberRequest,
} from "../api/barber";

const BarberContext = createContext();

export const useBarber = () => {
  const context = useContext(BarberContext);
  if (!context) {
    throw new Error("useBarber must be usend within an BarberProvider");
  }
  return context;
};

export function BarberProvider({ children }) {
  const [barbers, setBarbers] = useState([]);
  const [searchBarbers, setSearchBarbers] = useState([]);

  const createBarber = async (barber) => {
    const res = await createBarberRequest(barber);
    console.log(res.data);
  };

  const searchingBarbers = async (city, name) => {
    const res = await searchBarbersShopsRequest(city, name);
    console.log(res.data);
    setSearchBarbers(res.data);
  };

  return (
    <BarberContext.Provider value={{ barbers, createBarber, searchingBarbers, searchBarbers }}>
      {children}
    </BarberContext.Provider>
  );
}
