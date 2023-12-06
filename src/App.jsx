import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BarberProvider } from "./context/BarberContext.jsx";

import AppointmentPage from "./pages/appointmentPage.jsx";
import BarberPage from "./pages/barberPage.jsx";
import CancelPage from "./pages/cancelPage.jsx";
import EditBarberPage from "./pages/editBarberPage.jsx";
import EditProfilePage from "./pages/editProfilePage.jsx";
import ErrorBarberPage from "./pages/errorBarberPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import MyBarbersPage from "./pages/MyBarbersPage.jsx";
import PaymentPage from "./pages/paymentPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import RegisterBarberPage from "./pages/registerBarberPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import ScheduleAppointment from "./pages/scheduleAppointment.jsx";
import UpsPage from "./pages/upsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SuccessPage from "./pages/successPage.jsx";
import BarberChatPage from "./pages/BarberChat.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BarberProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/barber-shop/:id" element={<BarberPage />} />
              <Route
                path="/barber-shop/appointment/:id"
                element={<ScheduleAppointment />}
              />
              <Route path="/barber-chat/:id" element={<BarberChatPage />} />

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route
                path="/profile/appointments"
                element={<AppointmentPage />}
              />

              <Route path="/register-barber" element={<RegisterBarberPage />} />

              <Route path="/my-barbers" element={<MyBarbersPage />} />
              <Route path="/my-barbers/edit/:id" element={<EditBarberPage />} />

              <Route path="/payments/:id" element={<PaymentPage />} />

              <Route path="/error-barber-page" element={<ErrorBarberPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="/ups" element={<UpsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BarberProvider>
    </AuthProvider>
  );
}

export default App;
