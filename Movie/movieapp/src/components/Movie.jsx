import React from "react";
import styled from "styled-components"; 
import { useNavigate} from "react-router-dom";

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
`

const MovieInfo = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
`



export default function Movie({ movies }){

    const navigate = useNavigate();

    const OnClickMovieItem = (movie) => {
        navigate(`/moviedetailpage/${movie.id}`,{
            state: movie
    })
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
                </MovieContainer>
             ))}
        </AppContainer>
    )
}