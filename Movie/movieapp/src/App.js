import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import  MainPage from "./pages/MainPage"
import NotFound  from "./pages/NotFoundPage"
import NowPlaingPage from "./pages/NowPlayingPage"
import PopularPage from "./pages/PopularPage"
import TopRatedPage from "./pages/TopRatedPage"
import UpComingPage from "./pages/UpComingPage"
import MovieDetailPage from "./pages/MovieDetail";

function App() {
  return ( 
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/nowplayingpage" element={<NowPlaingPage />} />
        <Route path="/popularpage" element={<PopularPage />} />
        <Route path="/topratedpage" element={<TopRatedPage />} />
        <Route path="/upcomingpage" element={<UpComingPage />} />
        <Route path="/moviedetailpage/:id" element={<MovieDetailPage />} />
        <Route path="/*" element={<NotFound />} />


      </Routes>
      <Footer />
    </div>
    );
}

export default App;
