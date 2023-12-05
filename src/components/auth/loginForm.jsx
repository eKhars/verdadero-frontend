import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Sesión iniciada correctamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="flex items-center justify-center mt-10 ">
      <div className=" p-8 rounded-lg shadow-lg bg-zinc-900">
        <div className="mb-4 text-center">
          <img
            src="/barhallaLogo.png"
            alt="Barhalla Logo"
            className="mx-auto h-40 h40"
          />
          <h1 className="text-white text-xl font-bold">Inicia sesión</h1>
          {loginErrors.map((error, i) => (
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
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2"
            >
              Correo:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="barhhaala@gmail.com"
            />
            {errors.email && <p className="text-red-500">Correo inválido</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="*********"
            />
            {errors.password && (
              <p className="text-red-500">Contraseña inválida</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-orange-500">¿No tienes una cuenta? </span>
          <a href="/register" className="text-orange-500  font-bold">
            Crear cuenta
          </a>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default LoginForm;
