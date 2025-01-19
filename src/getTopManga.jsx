import { useEffect, useState } from "react";
import GetMangaDetails from "./getMangaDetails";
import { useNavigate } from "react-router-dom";



function GetTopManga() {
    const [mangaList, setMangaList] = useState([]);
    const [selectedMangaId, setSelectedMangaId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const mangaInformation = async() => {
        setIsLoading(true);
        try {
            let res = await fetch("https://api.jikan.moe/v4/top/manga");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            let data = await res.json();
            setMangaList(data.data);
        } catch(error) {
            setError(error.message);
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    mangaInformation(); 
}, []);

    const handleMangaClick = (id) => {
        navigate(`/manga/${id}`);
    };

    if (isLoading) return <div>Loading manga list...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <div>
            <div className="anime-container">
            {mangaList.map((manga) => (
                <div className="anime-card" 
                key={manga.mal_id}
                onClick={() => handleMangaClick(manga.mal_id)}
                style={{cursor: 'pointer'}}
                >
                <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="anime-image"
                />
                <div className="anime-title">{manga.title}</div>
                </div>
            ))}
            </div>
            {selectedMangaId && (
                <div className="anime-details">
                    <GetMangaDetails selectedMangaId={selectedMangaId} />
                </div>
            )}
        </div>
        </>
    );
}

export default GetTopManga;