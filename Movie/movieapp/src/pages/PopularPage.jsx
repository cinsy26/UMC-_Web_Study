import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";

export default function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); //
  const [totalPages, setTotalPages] = useState(1); //

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=6645b8c9d10784fde1593356bb56ee2e&language=en-US&page=${page}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);// API에서 제공하는 총 페이지 수
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [page]); //page

  return (
    <div>
      <Movie movies={movies} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
