import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const DetailPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: rgba(3, 37, 65, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const DetailPageTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Poster = styled.div`
  margin-right: 50px;
`;

const Content = styled.div`
  width: 400px;
`;

const StarContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const DetailPageBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Credit = styled.div`
  width: 100%;
  text-align: center;
`;

const CastList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const CastItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  margin: 10px;
  height: 220px;
  width: 120px;
  text-align: center;
  align-items: flex-start;

`;

const CastImage = styled.img`
  width: 100px;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px;
  margin-left: 10px;
`;

const CastText = styled.div`
  width: 120px;
  height: 60px;
  margin-top: 10px;
  text-align: center;
`;

export default function MovieDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [movieCredits, setMovieCredits] = useState(null);

  useEffect(() => {
    if (!state) {
      navigate('/404');
    } else {
      fetchMovieCredits(state.id);
    }
  }, [state, navigate]);

  const fetchMovieCredits = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: '6645b8c9d10784fde1593356bb56ee2e'
        }
      });
      setMovieCredits(response.data);
    } catch (error) {
      console.error("Failed to fetch movie credits", error);
    }
  };

  if (!state || !movieCredits) {
    return null;
  }

  const starCount = Math.floor(state.vote_average / 2);

  return (
    <DetailPageContainer>
      <DetailPageTop>
        <Poster>
          <img src={`https://image.tmdb.org/t/p/w500${state.poster_path}`} alt={state.title} width="360px" />
        </Poster>
        <Content>
          <h1>{state.title}</h1>
          <StarContainer>
            {Array(starCount).fill().map((_, i) => (
              <FaStar key={i} color="gold" />
            ))}
          </StarContainer>
          <h4>개봉일 {state.release_date}</h4>
          <h4>줄거리</h4>
          <p>{state.overview ? state.overview : '줄거리 정보가 없습니다.'}</p>
        </Content>
      </DetailPageTop>
      <DetailPageBottom>
        <Credit>
        <h4>감독</h4>
        <CastList>
          {movieCredits.crew
            .filter((crewMember) => crewMember.job === 'Director')
            .map((director) => (
              <CastItem key={director.credit_id}>
                {director.profile_path && <CastImage src={`https://image.tmdb.org/t/p/w200${director.profile_path}`} alt={director.name} />}
                <CastText>{director.name}</CastText>
              </CastItem>
            ))}
        </CastList>
          <h4>출연진</h4>
          <CastList>
            {movieCredits.cast.slice(0, 5).map((castMember) => (
              <CastItem key={castMember.cast_id}>
                <CastImage src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`} alt={castMember.name} />
                <CastText>
                <div>{castMember.name}</div>
                <div>{castMember.character}</div> {/* 역할 추가 */}
                </CastText>
              </CastItem>
            ))}
          </CastList>

          <h4>스태프</h4>
          <CastList>
            {movieCredits.crew.map((crewMember) => (
              <CastItem key={crewMember.credit_id}>
              <CastImage
              src={crewMember.profile_path ? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'}
              alt={`${crewMember.name}'s profile`}
/>


              <CastText>
                <div>{crewMember.name}</div>
                <div>{crewMember.job}</div> {/* 역할 추가 */}
                </CastText>
              </CastItem>
            ))}
          </CastList>
        </Credit>
      </DetailPageBottom>
    </DetailPageContainer>
  );
}
