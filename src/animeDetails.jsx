// GetAnimeDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GetAnimeDetails() {
    const { id } = useParams();
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [animeCharacters, setAnimeCharacters] = useState([]);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            setIsLoading(true);
            try {
                let res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                let characterRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                if (!characterRes.ok) throw new Error(`HTTP error! status: ${res.status}`);

                let data = await res.json();
                let characterData = await characterRes.json();

                console.log(animeCharacters);

                setSelectedAnime(data.data);
                setAnimeCharacters(characterData.data);

            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (!selectedAnime) return null;

    return (
        <>
        <div className="details-container">
            <div className="details-content">
                <div className="details-image-container">
                    <img
                        src={selectedAnime.images?.jpg?.large_image_url}
                        alt={selectedAnime.title}
                        className="details-image"
                    />
                </div>
                <div className="details-info">
                    <div className="details-rating">
                        TV • {selectedAnime.rating}
                    </div>
                    <h1 className="details-title">{selectedAnime.title}</h1>
                    <h6 className="details-title">{selectedAnime.title_japanese}</h6>
                    <div className="details-genres">
                        {selectedAnime.genres?.map((genre) => (
                            <span key={genre.mal_id} className="genre-tag">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <div className="details-status">
                        <h3>Status</h3>
                        <span className={`status-badge ${selectedAnime.status.toLowerCase().replace(' ', '-')}`}>
                            {selectedAnime.status}
                        </span>
                    </div>
                    <div className="details-actions">
                        <button className="action-button bookmark">
                            <span className="icon">🔖</span> Add to Bookmarks
                        </button>
                        <button className="action-button favorite">
                            <span className="icon">⭐</span> Add to favorites
                        </button>
                    </div>
                </div>
            </div>
            <div className="anime-synopsis">
            <h1>Synopsis:</h1> <br></br>
            {selectedAnime.synopsis}
        </div>
        <div className="anime-synopsis">
            <h1>Trailer:</h1><br></br>
            <iframe src={selectedAnime.embed_url}></iframe>
        </div>
        <div className="anime-synopsis">
            <h1>Characters: </h1><br></br>
            <div className="anime-container">
                {animeCharacters.map(({ character }) => (
                    <div className="anime-card" style={{ cursor: 'pointer' }} key={character.mal_id}>
                        <img
                            src={character.images?.jpg?.image_url || "default-image-url.jpg"}
                            alt={character.name || "Unknown Character"}
                            className="anime-image"
                        />
                        <div className="anime-title">{character.name || "Unknown Character"}</div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </>
  
    );
}

export default GetAnimeDetails;