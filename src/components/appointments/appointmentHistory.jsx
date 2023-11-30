import { ArrowLeft, ArrowRight } from "react-feather";
import NavBar from "../common/NavBar";
import { getUserAppointmentsRequest } from "../../api/appointments";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

function AppointmentHistory() {
  const [appointmentsData, setAppointmentsData] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getUserAppointmentsRequest(user.id);
        console.log(response.data);
        setAppointmentsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, [user.id]);

  const citasPorGrupo = 6;
  const [grupoActual, setGrupoActual] = useState(1);

  const inicioCita = (grupoActual - 1) * citasPorGrupo;
  const appointmentsList = appointmentsData.slice(
    inicioCita,
    inicioCita + citasPorGrupo
  );
  const totalGrupos = Math.ceil(appointmentsData.length / citasPorGrupo);

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
        <img
          src="/barhallaLogo.png"
          alt="Barhalla Logo"
          className="w-40 h-40 mx-auto mb-4"
        />
        <div className="absolute top-6 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
        <h1 className="text-2xl font-bold mb-10 text-orange-500">
          Historial de citas
        </h1>
        <div className="absolute top-40 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
        <div className={appointmentsData.length > citasPorGrupo ? "" : ""}>
          <div
            className={
              appointmentsData.length === 0
                ? ""
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            }
          >
            {appointmentsData.length === 0 ? (
              <div>
                <p className="text-gray-500 text-2xl bg-zinc-900 rounded-lg p-4 shadow-md mb-4">
                  Aquí se mostrarán tus citas
                </p>
                <img
                  src="https://res.cloudinary.com/dn1ng7anm/image/upload/v1700715126/qxlgr1hlgqqumyedilzp.png"
                  alt="Vikingo Imagen"
                  className="mx-auto"
                />
              </div>
            ) : (
              appointmentsData.map((appointment) => (
                <div
                  key={appointment._id}
                  className="p-4 bg-zinc-800 rounded-md shadow-md flex justify-between items-center"
                >
                  <div className="border-r-2 border-orange-500 pr-4">
                    <p className="text-lg font-semibold">
                      {appointment.date}
                    </p>
                    <p className="text-gray-600">{appointment.time}</p>
                    <p className="text-gray-600">{appointment.service}</p>
                    <p className="text-gray-600">Precio: {appointment.price}</p>
                  </div>
                   <div className="flex items-center">
                    <img
                      src={appointment.barberShopLogo}
                      alt="Foto de perfil de la barbería"
                      className="w-20 h-20 ml-5 rounded-lg mr-2"
                    />
                    <p className="text-lg font-semibold">
                      {appointment.barberShopName}
                    </p>
                  </div> 
                </div>
              ))
            )}
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

export default AppointmentHistory;
