import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HomePage() {
    const [animeList, setAnimeList] = useState([]);
    const [upcomingAnime, setUpcomingAnime] = useState([]);
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

    useEffect(() => {
        const getUpcomingAnime = async() => {
            try {
                const res = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=1`);

                if (!res.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`)
                }

                const data = await res.json();
                setUpcomingAnime(data.data)
            } catch(error) {
                setError(error.message);
                console.error(`Error occured while fetching data: `, error);
            }
        }
        getUpcomingAnime();
    }, []);

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
                <div className="hero-swiper-container">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className}"></span>`;
                        },
                        }}
                        autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay, Navigation]}
                        className="hero-swiper"
                    >
                        {upcomingAnime.map((anime) => (
                        <SwiperSlide key={anime.mal_id}>
                            <div className="hero-slide">
                            <div className="hero-content">
                                <div className="hero-poster">
                                <img
                                    src={anime.images.jpg.large_image_url}
                                    alt={anime.title}
                                    className="poster-image"
                                />
                                </div>
                                <div className="hero-info">
                                <div className="hero-status">
                                    {anime.status === "Not yet aired" ? "Upcoming" : anime.status}
                                </div>
                                <h2 className="hero-title">
                                    {anime.title}
                                    <span className="hero-title-jp">{anime.title_japanese}</span>
                                </h2>
                                <div className="hero-genres">
                                    {anime.genres.map((genre, index) => (
                                    <span key={genre.mal_id} className="hero-genre">
                                        {genre.name}
                                    </span>
                                    ))}
                                </div>
                                </div>
                            </div>
                            <div className="hero-backdrop">
                                <div className="backdrop-overlay"></div>
                                <img
                                src={anime.images.jpg.large_image_url}
                                alt=""
                                className="backdrop-image"
                                />
                            </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
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