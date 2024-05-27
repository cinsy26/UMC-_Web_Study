import React, { useState, useEffect } from "react";
import styled from "styled-components"; 
import { IoSearchOutline } from "react-icons/io5";
import Movie from "../components/Movie";
import useDebounce from "../hooks/debounce";

const MainPageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(3, 37, 65, 1);
`;

const MainPageTop = styled.div`
    height: 250px;
    width: 100%;
    background-color: black;
    color: white;
    font-weight: bold;
    font-size: 150%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainPageDown = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(3, 37, 65, 1);
`;

const MainPageDownTitle = styled.div`
    margin-bottom: 20px;
    margin-top: 40px;
    color: white;
    font-size: 200%;
`;

const MainPageDownWrap = styled.div`
    display: flex;
`;

const MainPageDownInput = styled.div`
    margin-bottom: 20px;
    margin-top: 20px;
`;

const TitleInput = styled.input`
    width: 300px;
    height: 30px;
    border-radius: 20px;
`;

const TitleButton = styled.button`
    width: 30px;
    height: 30px;
    margin-top: 25px;
    border-radius: 50px;
    margin-left: 20px;
    background-color: yellow;
`;

const MainPageBottom = styled.div`
    width: 900px;
    height: 500px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.5);
`;

export default function MainPage() {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [movies, setMovies] = useState([]);

    // 검색어 입력 시 호출되는 함수
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value); // 입력된 검색어를 상태에 반영
    };

    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                if (!debouncedSearchQuery) {
                    setMovies([]); // 검색어가 없으면 영화 목록 초기화
                    return;
                }
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6645b8c9d10784fde1593356bb56ee2e&query=${debouncedSearchQuery}`, {
                    signal: controller.signal
                });
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error(error);
                }
            }
        };

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [debouncedSearchQuery]);

    return (
        <MainPageContainer>
            <MainPageTop>
                환영합니다
            </MainPageTop>
            <MainPageDown>
                <MainPageDownTitle>Find your movies!</MainPageDownTitle>
                <MainPageDownWrap>
                    <MainPageDownInput>
                        <TitleInput
                            type="text"
                            placeholder="영화를 검색하세요"
                            value={searchQuery}
                            onChange={handleSearchInputChange} // 검색어 입력 시 상태 업데이트
                        />
                    </MainPageDownInput>
                    <div>
                        <TitleButton onClick={() => {}}> {/* 검색 버튼 클릭 시 검색 수행 */}
                            <IoSearchOutline />
                        </TitleButton>
                    </div>
                </MainPageDownWrap>
                {debouncedSearchQuery && (
                    <MainPageBottom>
                        <Movie movies={movies} />
                    </MainPageBottom>
                )}
            </MainPageDown>
        </MainPageContainer>
    );
}
