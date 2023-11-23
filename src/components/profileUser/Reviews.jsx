import { useState, useEffect } from "react";
import Navbar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { getReviewsRequest } from "../../api/reviews";

function Reviews() {
  const { user } = useAuth();

  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsRequest(user.id);
        console.log(response.data);
        setReviewsList(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [user.id]);

  return (
    <div style={{ marginBottom: '100px'}}>
      <article className="p-4 mx-auto max-w-md mt-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-orange-500">
          Reseñas
        </h1>

        <section className="max-h-60 sm:max-h-96 overflow-y-auto" key={1}>
          { reviewsList.length === 0 ? (<p className="text-gray-500 text-2xl bg-zinc-900 rounded-lg p-4 shadow-md mb-4 text-center">Aquí aparecerán tus reseñas</p>) : (reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900 rounded-lg p-4 shadow-md mb-4"
            >
              <h2 className="text-white font-semibold">{review.title}</h2>
              <p className="text-white mt-2">{review.comment}</p>
            </div>
          )))}
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
        </div>
      </article>
      <Navbar />
    </div>
  );
}

export default Reviews;
