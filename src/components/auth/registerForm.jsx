import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function registerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-lg bg-zinc-900 mt-6">
        <div className="mb-4 text-center">
          <img
            src="/barhallaLogo.png"
            alt="Barhalla Logo"
            className="mx-auto h-40"
          />
          <h1 className="text-white text-xl font-bold">Regístrate</h1>
          {registerErrors.map((error, i) => (
            <div
              className="bg-red-500 p-2 text-white text-center my-2 rounded"
              key={i}
            >
              {error}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              {...register("firstName", { 
                rquired: {
                  value: true,
                  message: "Nombre inválido"
                },
              })}
              className="w-full border border-gray-300 p-2 rounded bg-black text-white"
              placeholder="Tu nombre"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Apellido:
            </label>
            <input
              type="text"
              {...register("lastName", { 
                rquired: {
                  value: true,
                  message: "Nombre inválido"
                },
              })}
              className="w-full border border-gray-300 p-2 rounded bg-black text-white"
              placeholder="Tu apellido"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Correo:
            </label>
            <input
              type="email"
              {...register("email", {
                required:{
                  value: true,
                  message: 'Email requerido'
                },
                pattern:{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalido'
                }
              })}
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="atencion@barhalla.com"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { 
                required: {
                  value: true,
                  message: "Contraseña inválida"
                }
              })}
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="*********"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
          >
            Crear cuenta
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-orange-500">¿Ya tienes una cuenta?</span>
          <a href="/login" className="text-orange-500 font-bold">
            {" "}
            Inicia sesion
          </a>
        </div>
      </div>
    </div>
  );
}
export default registerForm;
