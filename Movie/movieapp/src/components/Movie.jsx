import React from "react";
import { useState } from "react";
import styled from "styled-components"; 
import { useNavigate} from "react-router-dom";
import axios from "axios";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const MovieContainer = styled.div`
    width: 250px;
    height: 350 px;
    margin: 16px;
    background-color: #373b69;
    color: white;
    border-radius: 5px;
    position: relative;

    img {
        width: 100%; /* 이미지를 부모 요소에 맞게 조정 */
         height: 80%; /* 이미지의 높이를 부모 요소의 70%로 설정 */

    }

    &:hover .moviedetail-container {
        display: block;
      }
`

const MovieInfo = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;

`

const MovieDetailContainer = styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* movie-container의 너비에 맞게 설정 */
    height: 100%; /* movie-container의 높이에 맞게 설정 */
    background-color: rgba(0, 0, 0, 0.8); /* 투명한 검은 배경색 */
    color: white;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;

`


export default function Movie({ movies }){

    const navigate = useNavigate();
    const [movieDetail, setMovieDetails] = useState(null);

    const OnClickMovieItem = async(movie) => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`,{
                params: {
                    api_key: '6645b8c9d10784fde1593356bb56ee2e'
                }
            });
            const movieData = response.data;
            navigate(`/moviedetailpage/${movie.id}`,{
                state: movieData
            });
        }catch(error) {
            console.error("Failed to fetch movie details", error);
        }
    }



    return(
        <AppContainer>
            {movies.map((movie)=>(
                <MovieContainer key={movie.id} onClick={()=>OnClickMovieItem(movie)}>
                    <img className='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                   
                    <MovieInfo>
                        <h4>{movie.title}</h4>
                        <h4>{movie.vote_average}</h4>
                    </MovieInfo>
                    <MovieDetailContainer className="moviedetail-container">
                        <h4>{movie.title}</h4>
                        <h4>{movie.overview}</h4>
                    </MovieDetailContainer>
                </MovieContainer>
             ))}
        </AppContainer>
    )
}