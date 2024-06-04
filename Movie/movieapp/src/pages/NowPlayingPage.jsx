import React, { useState, useEffect, useRef } from "react";
import Movie from "../components/Movie";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); //loading spinner
  const targetRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
        params: {
          api_key: '6645b8c9d10784fde1593356bb56ee2e',
          page: page
        }
      });
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //loading spinner
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchData();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [page]);

  return (
    <div>
      <Movie movies={movies} />
      {loading && <LoadingSpinner />} 
      <div ref={targetRef} style={{ height: "10px", background: "transparent" }}>
        {/* This is the target */}
      </div>
    </div>
  );
}
