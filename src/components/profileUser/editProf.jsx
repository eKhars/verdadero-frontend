import React, { useState, useRef, useEffect } from "react";
import NavBar from "../common/NavBar";
import { useAuth } from "../../context/AuthContext";
import { set, useForm } from "react-hook-form";
import { uploadImageRequest } from "../../api/upload";
import { updateClientRequest } from "../../api/client";

function EditProfile() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(objectUrl);
  };

  const upload = async () => {
    if (imagePreview !== user.photo) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await uploadImageRequest(formData);
        imageUrl = uploadResponse.secure_url;
      }

  }

  const onSubmit = handleSubmit(async (values) => {
    let imageUrl = user.photo;
    try {

      await upload();
      
      await updateClientRequest(user.id, {
        ...values,
        photo: imageUrl,
      });

      console.log("Perfil actualizado");
    } catch (error) {
      console.log(error);
    }
  });

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
      <form
        onSubmit={onSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="text-center">
          <img
            src={user?.photo}
            alt="Foto de perfil"
            className="w-32 h-32 mx-auto rounded-full object-cover mt-10"
          />
          <input
            type="file"
            className="my-4"
            // {...register("photo", { required: true })}
            // {errors.photo && <p className="text-red-500">Foto inválida</p>}
            onChange={handleFileInputChange}
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-white">
            Nombre:
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="w-full rounded p-2 bg-inherit border border-white"
            placeholder={user.firstName}
          />
          {errors.firstName && <p className="text-red-500">Nombre inválido</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-white">
            Apellido:
          </label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="w-full rounded p-2 bg-inherit border border-white"
            placeholder={user.lastName}
          />
          {errors.lastName && <p className="text-red-500">Apellido inválido</p>}
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
