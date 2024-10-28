import React from "react";
import { Link } from "react-router-dom";

function PhotoItem({ photo }) {
  return (
    <Link to={`/photos/${photo.id}`} className="block">
      <img src={photo.urls.thumb} alt={photo.alt_description} className="w-full h-auto object-cover rounded-lg" />
      <p className="text-sm text-gray-700 mt-1">By {photo.user.name}</p>
    </Link>
  );
}

export default PhotoItem;
