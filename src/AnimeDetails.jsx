import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock } from "lucide-react";


export default function AnimeDetails() {
    const { id } = useParams();
    const [animeDetails, setAnimeDetails] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [visible, setVisible] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => { 
        const fetchAnimeDetails = async() => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                const episodeRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)

                if (!res.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`);
                }

                if (!episodeRes.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`)
                }
    
                const data = await res.json();
                const episodeData = await episodeRes.json();
                setAnimeDetails(data.data);
                setEpisodes(episodeData.data);
            } catch (error) {
                setError(error.message);
                console.error(`Error occured while fetching data: `, error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAnimeDetails();
    }, [id]);

    const showMoreItems = () => {
        setVisible((prev) => prev + 12)
    }

    if (isLoading) return <div>Loading...</div>;
    if (!animeDetails) return null;

    return (
        <>
            <div className="details-container">
                <div className="trailer-container">
                    <iframe 
                        src={`${animeDetails.trailer.embed_url}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    >
                    </iframe>
                </div>
                <h1 className="details-title">{animeDetails.title}</h1>
                <h1 className="details-title-japanese">{animeDetails.title_japanese}</h1>
                <h1 style={{ fontSize: 16, display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <Star size={16} color="gold" /> {animeDetails.score}  
                    <Clock 
                    size={16} 
                    color={animeDetails === 'Finished Airing' || 'Not yet aired' ? "grey" : "green"} 
                    /> {
                        animeDetails.status}
                </h1>

                <div className="rating">
                    {animeDetails.rating} 
                </div>
                <div 
                className="hero-genres"
                style={{marginBottom: 7}}
                >
                    {animeDetails.genres.map((genre, index) => (
                        <span key={genre.mal_id} className="hero-genre">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <div 
                className="synopsis"
                >
                    <h1 style={{marginBottom: 7}}>
                        Synopsis
                    </h1>
                    <p>
                        {animeDetails.synopsis}
                    </p>
                </div>
                <div className="episode-info">
                    <h1>
                        Episodes
                    </h1>
                    <hr className='heading-rule'></hr>
                    <div className='episodes-container'>
                        {episodes.slice(0, visible).map((episode) => {
                            // Check if aired is not null or empty
                            const airedDate = episode.aired ? episode.aired.split("T")[0] : "Unknown Date";
                            return (
                                <div className="episode-container" key={episode.mal_id}>
                                    <div className="episode-count-name">
                                        <p>
                                            Episode {episode.mal_id}<br></br>
                                            {episode.title} 
                                        </p>
                                    </div>
                                    <p style={{ color: "grey" }}>
                                        {airedDate}
                                    </p>
                                </div>
                            );
                        })}
                        <button
                        className="view-more"
                        style={{fontFamily: "Quicksand"}}
                        onClick={() => showMoreItems()}
                        >
                            View More
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}