import React from "react";
import { Link } from "react-router-dom";

export default function MentorCard({ id, photo, name, specialty, email, phone }) {
  // Manejo seguro de la foto del mentor
  let finalPhoto;

  if (photo && photo.trim() !== "") {
    finalPhoto = photo;
  } else {
    // Placeholder genérico
    finalPhoto = "https://placehold.co/150x150?text=Mentor&font=roboto";

  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-100">
        <img src={finalPhoto} alt={name || "Mentor"} className="w-full h-full object-cover" />
      </div>

      <div className="mt-3">
        <div className="font-semibold text-gray-800">{name || "Nombre no disponible"}</div>
        <div className="text-sm text-gray-500 mt-1">{specialty || "Especialidad no especificada"}</div>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <div>{email || "Email no disponible"}</div>
        <div>{phone || "Teléfono no disponible"}</div>
      </div>

      <div className="mt-4 flex gap-2 w-full">
        <Link
          to={`/mentores/${id}/book`}
          className="flex-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-primaryDark text-sm text-center"
        >
          Reservar Sesión
        </Link>

        <Link
          to={`/mentores/${id}`}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm text-center text-gray-700 hover:bg-gray-50"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}
