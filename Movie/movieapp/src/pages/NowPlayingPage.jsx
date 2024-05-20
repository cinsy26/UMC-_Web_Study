import React from "react";
import Movie from "../components/Movie";
import { useState } from "react";
import { useEffect } from "react";


export default function NowPlayingPage(){

    const[movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=6645b8c9d10784fde1593356bb56ee2e");
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMovies();
    }, []);
  
  
    return(
            <div>
              <Movie movies={movies} />
            </div>
           );
  }