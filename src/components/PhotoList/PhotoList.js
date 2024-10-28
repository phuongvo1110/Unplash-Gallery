import { useEffect, useState } from "react";
import axios from "axios";
import PhotoItem from "../PhotoItem/PhotoItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://api.unsplash.com/photos",
                    {
                        params: { page, per_page: 12 },
                        headers: {
                            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
                        },
                    }
                );
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);

                if (response.data.length < 12) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 12
        ) {
            if (!loading && hasMore) setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);
    return (
        <div className="container mx-auto p-4">
      {photos.length > 0 ? (
        <div className="grid gap-4">
          {photos.map((photo, index) => {
            // Calculate the row and column index
            const rowIndex = Math.floor(index / 3);
            const colIndex = index % 3;

            // Render the PhotoItem within the appropriate grid cell
            return (
              <div key={photo.id} style={{ gridRow: rowIndex + 1, gridColumn: colIndex + 1 }}>
                <PhotoItem key={photo.id} photo={photo} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No photos to display.</p>
      )}
      {/* ... loading and no-more-photos indicators */}
    </div>
    );
}
export default PhotoList;
