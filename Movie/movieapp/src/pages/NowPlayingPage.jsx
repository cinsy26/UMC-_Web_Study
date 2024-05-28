import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import axios from "axios";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
          params: {
            api_key: '6645b8c9d10784fde1593356bb56ee2e'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Movie movies={movies} />
    </div>
  );
}
