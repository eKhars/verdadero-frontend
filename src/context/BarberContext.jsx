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
  const [barber, setBarber] = useState([]);
  const [searchBarbers, setSearchBarbers] = useState([]);

  const createBarber = async (barber) => {
    const res = await createBarberRequest(barber);
    console.log(res.data);
  };

  const  getBarbers = async () => {
    try {
      const res = await getBarbersRequest();
      console.log(res.data);
      setBarbers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBarber = async (id) => {
    try {
      const res = await getBarberRequest(id);
      console.log(res.data);
      setBarber(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const searchingBarbers = async (city, name) => {
    const res = await searchBarbersShopsRequest(city, name);
    console.log(res.data);
    setSearchBarbers(res.data);
  };

  return (
    <BarberContext.Provider value={{ barbers, createBarber, searchingBarbers, searchBarbers, getBarbers, barber, getBarber }}>
      {children}
    </BarberContext.Provider>
  );
}