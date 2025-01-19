import GetSeasonalAnime from "./getSeasonalAnime"
import Header from "./Header"
import GetTopAnime from "./getTopAnime"
import Navbar from "./Navbar"
import GetTopManga from "./getTopManga"
import GetAnimeDetails from "./animeDetails"
import UpcomingAnime from "./upcoming"
import GetMangaDetails from "./getMangaDetails"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
      <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<GetSeasonalAnime/>}> </Route>
          <Route path="/top-anime" element={<GetTopAnime/>}> </Route>
          <Route path="/top-manga" element={<GetTopManga/>}></Route>
          <Route path="/anime/:id" element={<GetAnimeDetails/>}></Route>
          <Route path="/upcoming-anime" element={<UpcomingAnime/>}></Route>
          <Route path="/manga/:id" element={<GetMangaDetails/>}></Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
