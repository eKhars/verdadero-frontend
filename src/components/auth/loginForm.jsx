import { useAuth } from "../../context/AuthContext";
function LoginForm() {
  const { setUser,signin, setIsAuthenticated, errors } = useAuth();

  const login = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
  
      const res = await signin(user);
      console.log(res);

    
  }

  return (
    <div className="flex items-center justify-center mt-10 ">
      <div className=" p-8 rounded-lg shadow-lg bg-zinc-900">
        <div className="mb-4 text-center">
          <img src="/barhallaLogo.png" alt="Barhalla Logo" className="mx-auto h-40 h40" />
        </div>
        <form 
          onSubmit={login}
        >
          {
            errors.length !== 0 && (
              <div className="bg-red-500 p-2 mb-4 text-white text-center rounded font-semibold animate-pulse">
                {errors}
              </div>
            )
          }
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
              Correo:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="barhhaala@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded bg-black"
              placeholder="********* "
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 rounded">
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-orange-500">¿No tienes una cuenta? </span>
          <a href="/register" className="text-orange-500  font-bold">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
