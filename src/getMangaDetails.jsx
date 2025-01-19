import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GetMangaDetails() {
    const { id } = useParams();
    const [selectedManga, setSelectedManga] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const mangaInformation = async() => {
            setIsLoading(true);
            try {
                let res = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                let data = await res.json();
                setSelectedManga(data.data);
            } catch(error) {
                console.error("Error fetching data: ", error)
            } finally {
                setIsLoading(false);
            }
        };
    mangaInformation();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (!selectedManga) return null;

    return (
        <>
            <div className="details-container">
                <div className="details-content">
                    <div className="details-image-container">
                        <img
                            src={selectedManga.images?.jpg?.image_url}
                            alt={selectedManga.title}
                            className="details-image"
                        />
                    </div>
                    <div className="details-info">
                        <h1 className="details-title">{selectedManga.title}</h1>
                        <div className="details-genres">
                            {selectedManga.genres?.map((genre) => (
                                <span key={genre.mal_id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <div className="details-status">
                            <h3>Status</h3>
                            <span className={`status-badge ${selectedManga.status?.toLowerCase().replace(' ', '-')}`}>
                                {selectedManga.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="anime-synopsis">
                    <h1>Synopsis:</h1>
                    <br />
                    {selectedManga.synopsis}
                </div>
            </div>
        </>
    );
    
}
export default GetMangaDetails;