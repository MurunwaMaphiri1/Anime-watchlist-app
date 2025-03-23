import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function AnimeDetails() {
    const { id } = useParams();
    const [animeDetails, setAnimeDetails] = useState('');
    const [episodes, setEpisodes] = useState([]);
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

    if (isLoading) return <div>Loading...</div>;
    if (!animeDetails) return null;

    return (
        <>
            <div className="details-container">
                <div className="trailer-container">
                    <iframe 
                        src={`https://www.youtube.com/embed/${animeDetails.trailer.youtube_id}?enablejsapi=1&wmode=opaque&autoplay=0&showinfo=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    >
                    </iframe>
                </div>
                <h1 className="details-title">{animeDetails.title}</h1>
                <h1 className="details-title-japanese">{animeDetails.title_japanese}</h1>
                <div className="rating">
                    {animeDetails.rating} 
                </div>
                <div className="hero-genres">
                    {animeDetails.genres.map((genre, index) => (
                        <span key={genre.mal_id} className="hero-genre">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <div className="synopsis">
                    <h1>
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
                        {episodes.map((episode) => {
                            // Check if aired is not null or empty
                            const airedDate = episode.aired ? episode.aired.split("T")[0] : "Unknown Date";
                            return (
                                <div className="episode-container" key={episode.mal_id}>
                                    <p>
                                        {episode.title_japanese} 
                                    </p>
                                    <p style={{ color: "grey" }}>
                                        {airedDate}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}