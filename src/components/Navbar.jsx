import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const handleHomeClick = () => {
        navigate(`/`);
    }

    return(
        <>
        <nav className="navbar">
            <div className="nav-container">
                <img src="./search-svgrepo-com.svg" alt="Search" className="nav-icon search-icon" />

                <div className="logo-header">
                    <a onClick={() => handleHomeClick()}>
                        <span className='first-part-of-name'>Yume</span>Anime
                    </a>
                </div>
                
                <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                <img src="./burger-menu-right-svgrepo-com.svg" height={30} width={30} alt="Menu" />
                </button>

                {isOpen && (
                <div className="menu">
                    <div className="logo"><span className='first-part-of-name'>Yume</span>Anime</div>
                    <ul>
                    <li>
                        <a href="/">
                        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        Home
                        </a>
                    </li>
                    <li>
                        <a href="/series">
                        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"></path>
                        </svg>
                        Series
                        </a>
                    </li>
                    <li>
                        <a href="/movies">
                        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h-2v-2h2zm0-4v2h-2V9h2zm-4 4v2H7v-2h4zm0-4v2H7V9h4zm-6 4v2H3v-2h2zm0-4v2H3V9h2z" clipRule="evenodd"></path>
                        </svg>
                        Movie
                        </a>
                    </li>
                    <li>
                        <a href="/popular">
                        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        Popular
                        </a>
                    </li>
                    </ul>
                </div>
                )}
            </div>
            </nav>
        </>
    )
}