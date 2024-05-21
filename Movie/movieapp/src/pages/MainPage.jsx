import React from "react";
import { useState } from "react";
import styled, {createGlobalStyle} from "styled-components"; 
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from "react";
import Movie from "../components/Movie";

const MainPageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(3, 37, 65, 1);

`

const MainPageTop = styled.div`
    height: 250px;
    width:100%;
    background-color: black;
    color: white;
    font-weight: bold;
    font-size: 150%;

    display: flex; /* 요소를 수평 또는 수직 정렬하기 위해 flex 사용 */
    flex-direction: column; /* 아이템을 세로 방향으로 배치 */
    justify-content: center; /* 수직 중앙 정렬 */
    align-items: center; /* 수평 중앙 정렬 */

`

const MainPageDown = styled.div`
    height: 100vh;
    display: flex; /* 요소를 수평 또는 수직 정렬하기 위해 flex 사용 */
    flex-direction: column; /* 아이템을 세로 방향으로 배치 */
    align-items: center; /* 수평 중앙 정렬 */

    background-color: rgba(3, 37, 65, 1);
`

const MainPageDownTitle = styled.div`
    margin-bottom: 20px; /* 요소들 간 간격 조절 */
    margin-top: 40px;
    color: white;
    font-size: 200%;
`

const MainPageDownWrap = styled.div`
    display: flex;
`

const MainPageDownInput = styled.div`
    margin-bottom: 20px; /* 요소들 간 간격 조절 */
    margin-top: 20px;
`

const TitleInput = styled.input`
    width: 300px;
    height: 30px;
    border-radius:20px;
`

const TitleButton = styled.button`
    width:30px;
    height: 30px;
    margin-top: 25px;
    border-radius: 50px;
    margin-left: 20px;
    background-color: yellow;

`

const MainPageBottom = styled.div`
    width: 900px;
    height: 500px;
    overflow: auto; /* 스크롤 생성 */
    background-color: rgba(255, 255, 255, 0.5); /* 흰색 배경에 50%의 투명도 적용 */

    

`


export default function MainPage() {
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [movies, setMovies] = useState([]);

    // 검색어 입력 시 호출되는 함수
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value); // 입력된 검색어를 상태에 반영
    };

    // 검색 버튼 클릭 시 호출되는 함수
    const handleSearch = () => {
        // 여기서 검색을 수행하거나 검색어를 활용하여 다른 작업을 수행할 수 있습니다.
        console.log("검색어:", searchQuery);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (!searchQuery) {
                    setMovies([]); // 검색어가 없으면 영화 목록 초기화
                    return;
                }
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6645b8c9d10784fde1593356bb56ee2e&query=${searchQuery}`);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [searchQuery]);

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
                        <TitleButton onClick={handleSearch}> {/* 검색 버튼 클릭 시 검색 수행 */}
                            <IoSearchOutline />
                        </TitleButton>
                    </div>
                </MainPageDownWrap>
                {searchQuery && (
                    <MainPageBottom>
                        <Movie movies={movies} />
                    </MainPageBottom>
                )}
            </MainPageDown>
        </MainPageContainer>
    );
}
