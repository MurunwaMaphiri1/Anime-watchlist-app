import { useState, useEffect } from "react";
import GetAnimeDetails from "./animeDetails";
import { useNavigate } from "react-router-dom";

function GetSeasonalAnime() {
    const [animeList, setAnimeList] = useState([]);
    const [selectedAnimeId, setSelectedAnimeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const animeInformation = async() => {
        setIsLoading(true);
        try {
            const res = await fetch("https://api.jikan.moe/v4/seasons/now");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setAnimeList(data.data);
            

        } catch(error) {
            setError(error.message);
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    animeInformation();
}, []);

    const handleAnimeClick = (id) => {
        navigate(`/anime/${id}`);
    };



    if (isLoading) return <div>Loading anime list...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <br /><br />
            <h2 className="section-title">Ongoing anime</h2>
            <div className="anime-container">
                {animeList.map((anime) => (
                    <div 
                        className="anime-card" 
                        key={anime.mal_id} 
                        onClick={() => handleAnimeClick(anime.mal_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={anime.images.jpg.large_image_url}
                            alt={anime.title}
                            className="anime-image"
                        />
                        <div className="anime-title">{anime.title.length > 20 ? `${anime.title.slice(0, 20)}...` : anime.title}
                        </div>
                        <br />
                    </div>
                ))}
            </div>
            {selectedAnimeId && (
                <div className="anime-details">
                    <GetAnimeDetails selectedAnimeId={selectedAnimeId} />
                </div>
            )}
        </div>
    );
    
}

export default GetSeasonalAnime;