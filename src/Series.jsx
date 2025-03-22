import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Series() {
    const [seriesList, setSeriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getSeries = async() => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&limit=24&page=1`);

                if (!res.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`);
                }
    
                const data = await res.json();
                setSeriesList(data.data);
            } catch (error) {
                setError(error.message);
                console.error(`Error occured while fetching data: `, error);
            } finally {
                setIsLoading(false);
            }
        }
        getSeries();
    }, []);

    return(
        <>
            <div className='heading'>
                <h1>Series</h1>
            </div>
            <hr className='heading-rule'></hr>
            <div className='container'>
                {seriesList.map((anime) => (
                    <div
                        className="anime-card"
                        key={anime.mal_id}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={ anime.images.jpg.large_image_url }
                            alt={ anime.title }
                            className='anime-image'
                        />
                        <div className='anime-title'>{ anime.title }</div>
                        <div className='date'>{ anime.year }</div>
                    </div>
                ))}
            </div>
        </>
    )
}