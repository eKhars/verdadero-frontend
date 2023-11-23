import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BarberProvider } from "./context/BarberContext.jsx";

import AppointmentPage from "./pages/AppointmentPage.jsx";
import BarberPage from "./pages/BarberPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import EditBarberPage from "./pages/EditBarberPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import ErrorBarberPage from "./pages/ErrorBarberPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyBarbersPage from "./pages/MyBarbersPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterBarberPage from "./pages/RegisterBarberPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ScheduleAppointment from "./pages/ScheduleAppointment.jsx";
import UpsPage from "./pages/UpsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

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
                path="/barber-shop/appointment"
                element={<ScheduleAppointment />}
              />

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route
                path="/profile/appointments"
                element={<AppointmentPage />}
              />

              <Route path="/register-barber" element={<RegisterBarberPage />} />

              <Route path="/my-barbers" element={<MyBarbersPage />} />
              <Route path="/my-barbers/edit/:id" element={<EditBarberPage />} />

              <Route path="/payments" element={<PaymentPage />} />

              <Route path="/error-barber-page" element={<ErrorBarberPage />} />
              <Route path="/succes" element={<SuccessPage />} />
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
