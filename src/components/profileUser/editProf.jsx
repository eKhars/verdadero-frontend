import React, { useState, useRef } from "react";
import NavBar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";

function EditProfile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="absolute top-6 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
      <img
        src="/barhallaLogo.png"
        alt="Barhalla Logo"
        className="w-40 h-40 mx-auto mb-2"
      />
      <h1 className="text-2xl font-semibold mb-4 text-center text-orange-500">
        Editar Perfil
      </h1>
      <div className="absolute top-29 left-0 sm:left-1/4 w-full sm:w-1/2 h-1 bg-orange-500"></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <img
            src={previewImage || formData.profilePicture || "/y.jpeg"}
            alt="Foto de perfil"
            className="w-32 h-32 mx-auto rounded-full object-cover mt-10"
          />
          <button
            type="button"
            className="cursor-pointer bg-zinc-800 hover:bg-zinc-900 text-white py-2 px-4 rounded-lg mt-4"
            onClick={handleImageUpload}
          >
            Cambiar Foto de Perfil
          </button>
          <input
            type="file"
            name="profilePicture"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-white">
            Nombre:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded p-2 bg-inherit border border-white"
            placeholder={user.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-white">
            Apellido:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded p-2 bg-inherit border border-white"
            placeholder={user.lastName}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
      <NavBar />
    </div>
  );
}

export default EditProfile;
