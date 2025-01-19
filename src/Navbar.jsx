import GetTopAnime from "./getTopAnime";
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className="navbar">
        <div className="logo">Ani<span className="highlight">Mei</span></div>
        <ul>
            <li>
                <Link to="/">Ongoing</Link>
            </li>
            <li>
                <Link to="/upcoming-anime">Upcoming</Link>
            </li>
            <li>
                <Link to="/top-anime">Top Anime</Link>
            </li>
            <li>
                <Link to="/top-manga">Top Manga</Link>
            </li>
        </ul>
    </div>
    );
}

export default Navbar;
