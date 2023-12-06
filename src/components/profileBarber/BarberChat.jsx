import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { useBarber } from "../../context/BarberContext";
import { useParams } from "react-router-dom";

const socket = io("https://barhala-backend.onrender.com");

function BarberChat() {
  const { user } = useAuth();
  const { barber, getBarber } = useBarber();
  const params = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getBarber(params.id);
  }, []);

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [message, ...state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages((state) => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-lg">
        <img
          src={barber.logo}
          alt="Barhalla Logo"
          className="mx-auto h-40 h40 rounded-md"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold my-2 text">
            ¡Hola! Bienvenido al chat de la comunidad
          </h1>
          <span className="text-orange-500 font-bold text-xl">
            {barber.name}
          </span>
        </div>

        <input
          name="message"
          type="text"
          placeholder="Contáctanos..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black mt-4 mb-4"
          value={message}
          autoFocus
        />

        <ul className="h-80 overflow-y-auto">
          {messages.slice().reverse().map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-orange-500 ml-auto" : "bg-black"
              }`}
            >
              <b className="mr-2">
                { message.from === "Me" ? "Yo:" : (<b>{user.firstName} {user.lastName}:</b>) }
              </b>
              {message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default BarberChat;
