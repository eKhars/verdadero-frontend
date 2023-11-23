import { createContext, useState } from "react";
import {
  getBarberRequest,
  getBarbersRequest,
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

  const createBarber = async (barber) => {
    const res = await createBarberRequest(barber)
    console.log(res.data)
  };

  return (
    <BarberContext.Provider value={{ barbers, createBarber }}>
      {children}
    </BarberContext.Provider>
  );
}
