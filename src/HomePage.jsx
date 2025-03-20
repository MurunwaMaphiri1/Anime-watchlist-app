import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getOngoingAnime = async() => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.jikan.moe/v4/seasons/now`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
    
                const data = await res.json();
                setAnimeList(data.data);
                //For debugging purposes
                console.log(`Payload:`, data.data);
            } catch (error) {
                setError(error.message);
                console.error(`Error occured while fetching data: `, error);
            } finally {
                setIsLoading(false);
            }
        }
        getOngoingAnime();
    }, [])

    return (
        <>
            {/* <nav>
                <ul>
                    <li><a href='#'/>Home</li>
                    <li><a href='#'/>Series</li>
                    <li><a href='#'/>Movies</li>
                    <li><a href='#'/>Popular</li>
                </ul>
            </nav> */}
            <div className='heading'>
                <h1>Ongoing Anime</h1>
            </div>
            <hr className='heading-rule'></hr>
            <div className='container'>
                {animeList.map((anime) => (
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