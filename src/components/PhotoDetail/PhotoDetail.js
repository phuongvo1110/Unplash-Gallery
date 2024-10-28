import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}` }
        });
        setPhoto(response.data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!photo) return <p>Photo not found</p>;

  return (
    <div className="container mx-auto p-4">
      <img src={photo.urls.full} alt={photo.alt_description} className="w-full h-auto object-cover rounded-lg" />
      <h2 className="text-2xl font-bold mt-4">{photo.description || "Untitled"}</h2>
      <p className="text-sm text-gray-700">By {photo.user.name}</p>
      <p className="text-sm text-gray-700 mt-2">{photo.alt_description || "No description available."}</p>
    </div>
  );
}

export default PhotoDetail;
