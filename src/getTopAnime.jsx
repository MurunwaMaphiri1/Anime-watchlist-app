import { useEffect, useState } from "react";
import GetAnimeDetails from "./animeDetails";
import { useNavigate } from "react-router-dom";

function GetTopAnime() {

    const [animeList, setAnimeList] = useState([]);
    const [selectedAnimeId, setSelectedAnimeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    const animeInformation = async() => {
        setIsLoading(true);
        try {
            let res = await fetch("https://api.jikan.moe/v4/top/anime");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            let data = await res.json();
            setAnimeList(data.data);

        } catch(error) {
            setError(error.message);
            console.error("Error fetching data: ", error)
        } finally {
            setIsLoading(false);
        }
    }
    animeInformation();
  }, []);

    const handleAnimeClick = (id) => {
        navigate(`/anime/${id}`);
    };

    if (isLoading) return <div>Loading anime list...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <br></br>
            <h2 className="section-title">Top Anime</h2>
            <div className="anime-container">
                {animeList.map((anime) => (
                    <div 
                        className="anime-card" 
                        key={anime.mal_id} 
                        onClick={() => handleAnimeClick(anime.mal_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="anime-image"
                        />
                        <div className="anime-title">{anime.title}</div>
                        <div className="anime-year">{anime.year}</div>
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
export default GetTopAnime;