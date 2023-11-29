import { useState, useEffect } from "react";
import Navbar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { getUserReviewsRequest, deleteReviewRequest } from "../../api/reviews";
import { logoutRequest } from "../../api/auth";
import{Toaster, toast} from 'sonner';


function Reviews() {
  const { user } = useAuth();

  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getUserReviewsRequest(user.id);
        console.log(response.data);
        setReviewsList(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [user.id]);

  const handleLogout = async () => {
    try {
      await logoutRequest();
      toast.success("Sesión cerrada correctamente");
      setTimeout(() => {
      window.location.href = "/";
      },2000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const deleteReview = async (id) => {
    await deleteReviewRequest(id);
    toast.success("Reseña eliminada");
    setTimeout(() => {
    window.location.reload();
    },2000);
   
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <article className="p-4 mx-auto max-w-md mt-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-orange-500">
          Reseñas
        </h1>
        <section className="max-h-60 sm:max-h-96 overflow-y-auto">
          {reviewsList.length === 0 ? (
            <p className="text-gray-500 text-2xl bg-zinc-900 rounded-lg p-4 shadow-md mb-4 text-center">
              Aquí aparecerán tus reseñas
            </p>
          ) : (
            reviewsList.map((review) => (
              <div
                key={review._id}
                className="bg-zinc-900 rounded-lg p-4 shadow-md mb-4"
              >
                <div className="flex justify-between items-center text-center">
                  <h1 className="text-orange-500 text-xl font-semibold">
                    {review.barberName}
                  </h1>
                  <h3>
                    <span className="text-white">Fecha: </span>
                    <span className="text-orange-500">
                      {review.createdAt.slice(0, 10)}
                    </span>
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-white font-semibold">{review.title}</h2>
                    <p className="text-white mt-2">{review.comment}</p>
                  </div>
                  <button className="border border-red-500  text-red-500 w-20 h-12 rounded-lg hover:border-black hover:text-black hover:bg-red-800" onClick={() => deleteReview(review._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
        <div className="mt-4 flex flex-col space-y-2 items-center">
          <a href="/profile/edit">
            <button className="border text-white w-80 h-12 rounded-lg  hover:border-black hover:text-black hover:bg-white">
              Editar Perfil
            </button>
          </a>

          <a href="/profile/appointments">
            <button className="border text-white w-80 h-12 rounded-lg  hover:border-black hover:text-black hover:bg-white">
              Historial de Citas
            </button>
          </a>

          <a href="/register-barber">
            <button className="border text-white w-80 h-12 rounded-lg hover:border-black hover:text-black hover:bg-white">
              ¿Tienes una barbería?
            </button>
          </a>

          <a href="/register-barber">
            <button
              onClick={handleLogout}
              className="border border-red-500  text-red-500 w-80 h-12 rounded-lg hover:border-black hover:text-black hover:bg-red-800"
            >
              Cerrar Sesión
            </button>
          </a>
        </div>
      </article>
      <Navbar />
      <Toaster position="top-right" />
    </div>
  );
}

export default Reviews;
