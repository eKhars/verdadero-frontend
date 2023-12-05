import { createContext, useState, useContext } from "react";
import {
  getBarberRequest,
  getBarbersRequest,
  getUserBarberShopsRequest,
  searchBarbersShopsRequest,
  createBarberRequest,
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
  const [userBarbers, setUserBarbers] = useState([]);
  const [appointmentData, setAppointmentData] = useState({});
  const [notify, setNotify] = useState(null);

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

  const getUserBarbers = async () => {
    try {
      const res = await getUserBarberShopsRequest();
      console.log(res.data);
      setUserBarbers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

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

  const appointment = async (appointment) => {
    setAppointmentData(appointment);
    localStorage.setItem('appointmentData', JSON.stringify(appointment));
  }

  const getNotify = (data) => {
    setNotify(data);
  }

  return (
    <BarberContext.Provider value={{ barbers, createBarber, searchingBarbers, searchBarbers, getBarbers, barber, getBarber, getUserBarbers, userBarbers, appointment, appointmentData, getNotify, notify}}>
      {children}
    </BarberContext.Provider>
  );
}
