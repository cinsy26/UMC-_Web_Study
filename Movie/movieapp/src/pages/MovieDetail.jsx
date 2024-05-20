import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const DetailPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: rgba(3, 37, 65, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const Poster = styled.div`
  margin-right: 50px;
`;

const Content = styled.div`
  width: 400px;
  margin: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default function MovieDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/404');
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const starCount = Math.floor(state.vote_average / 2);

  return (
    <DetailPageContainer>
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
    </DetailPageContainer>
  );
}
