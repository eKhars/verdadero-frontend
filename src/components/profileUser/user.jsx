import {useAuth} from "../../context/AuthContext"

function User() {
  const { user } = useAuth()
  console.log(user);
  return (
    <section className="flex flex-col items-center mr-6 ml-6 relative">
      <header className="sm:mb-4">
        <img
          src="/barhallaLogo.png"
          alt="Logo de la aplicación"
          className="w-32 h-32 mt-4 sm:w-48 sm:h-48"
        />
      </header>
      <div className="absolute top-6 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
      <article className="bg-zinc-800 p-4 rounded-md shadow-md flex mt-2 relative">
        <aside className="mr-4">
          <img
            src={user.photo}
            alt="Foto del usuario"
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-lg"
          />
        </aside>
        <div>
          <h1 className="text-lg font-semibold">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-500">
            Fecha de registro: {user.createdAt.slice(0, 10)}
          </p>
        </div>
      </article>
      <div className="absolute bottom-[-20px] left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
      <div className="mt-4 text-center sm:text-left flex items-center sm:items-start">
        <p className="text-gray-500" style={{ marginRight: "10px" }}>
          {user.reviews.length > 0 ? `Reseñas: ${user.reviews.length}` : 'Aún no tienes reseñas'}
        </p>
        <p className="text-orange-500" style={{ marginRight: "10px" }}>
          |
        </p>
        <p className="text-gray-500" style={{ marginRight: "10px" }}>
        {user.appointments.length > 0 ? `Citas: ${user.appointments.length}` : 'Aún no tienes citas'}
        </p>
      </div>
    </section>
  );
}

export default User;
