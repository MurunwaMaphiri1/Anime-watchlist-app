import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Series() {
    const [seriesList, setSeriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    let [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSeries = async() => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&limit=24&page=${pageNumber}`);

                if (!res.ok) {
                    throw new Error(`HTTP error!! status: ${res.status}`);
                }
    
                const data = await res.json();
                setSeriesList(data.data);
                handlePageChange(data.pagination.items.total);
            } catch (error) {
                setError(error.message);
                console.error(`Error occured while fetching data: `, error);
            } finally {
                setIsLoading(false);
            }
        }
        getSeries();
    }, [pageNumber]);

    const handleAnimeClick = (id) => {
        navigate(`/anime/${id}`)
    }

    const handlePageChange = (totalItems) => {
        const totalPages = Math.ceil(totalItems/24);
        setPages([...Array(totalPages).keys()].map(i => i + 1));
    }

    const nextPage = () => {
        if (pageNumber < pages.length) {
            setPageNumber(prev => prev + 1)
        }
    }

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1)
        }
    }

    return(
        <>
        <div className='details-container'>
            <div className='heading'>
                <h1>Series</h1>
            </div>
            <hr className='heading-rule'></hr>
            <div className='container'>
                {seriesList.map((anime) => (
                    <div
                        className="anime-card"
                        key={anime.mal_id}
                        onClick={() => handleAnimeClick(anime.mal_id)}
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
            <hr className='heading-rule'></hr>
            <div className="pagination-container">
                <p className="pagination-info">Page {pageNumber} of {pages.length}</p>
                <div className="pagination">
                    {/* Previous Button */}
                    <button 
                        className="pagination-btn" 
                        onClick={() => previousPage()} 
                        disabled={pageNumber === 1}
                    >
                        {'<'}
                    </button>

                    {/* Next Button */}
                    <button 
                        className="pagination-btn" 
                        onClick={() => nextPage()} 
                        disabled={pageNumber === pages.length}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
            </div>
        </>
    )
}