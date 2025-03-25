import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Search() {
    const [animeList, setAnimeList] = useState([]);
    const [animeTitle, setAnimeTitle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


        const getAnime = async() => {
            try {
                const encodedTitle = encodeURIComponent(animeTitle);
                const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodedTitle}`);

                if (!res.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`)
                }

                const data = await res.json();
                setAnimeList(data.data);
                handlePageChange(data.pagination.items.total);
            } catch(error) {
                setError(error.message);
                console.log(`Error occured while fetching data: `, error)
            } 
        }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getAnime()
        }
    }

    const handleAnimeClick = (id) => {
        navigate(`/anime/${id}`)
    }


    return(
        <>
            <div className="details-container">
                <div className="search-component">
                    <input 
                    style={{fontFamily: "Quicksand", color: "white"}} 
                    value={animeTitle}
                    onChange={(e) => setAnimeTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="search-component" type="text" placeholder="Search..."
                    />
                </div>
                <div className="outer-container">
                    <div className="results-container">
                        {animeList.map((anime) => (
                            <div
                            className="results-container-card"
                            key={anime.mal_id}
                            onClick={() => handleAnimeClick(anime.mal_id)}
                            style={{ cursor: 'pointer' }}
                            >
                                <img
                                src={ anime.images.jpg.large_image_url }
                                alt={ anime.title }
                                className='anime-image'
                                />
                                <div className='results-details'>
                                    <p
                                    style={{marginBottom: 5}}
                                    >{ anime.title }</p>
                                    <p style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                        <Star size={13} color="gold" /> {anime.score}  
                                        <Clock 
                                        size={13} 
                                        color={anime === 'Finished Airing' || 'Not yet aired' ? "grey" : "green"} 
                                        /> {
                                            anime.status}
                                    </p>
                                    <div className="anime-title">
                                        <p
                                        style={{fontSize: 13, marginTop: -3}}
                                        >{ anime.synopsis }</p>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}