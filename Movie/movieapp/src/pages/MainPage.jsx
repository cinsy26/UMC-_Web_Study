import React from "react";
import styled from "styled-components"; 
import { IoSearchOutline } from "react-icons/io5";

const MainPageContainer = styled.div`
    height: 100%;
    width: 100%;
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

const TitleInput = styled.button`
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

export default function MainPage(){
    return(
        <MainPageContainer>
            <MainPageTop>
                환영합니다
            </MainPageTop>
            <MainPageDown>
                <MainPageDownTitle>Find your movies!</MainPageDownTitle>
                    <MainPageDownWrap>
                        <MainPageDownInput>
                            <TitleInput type="text" />
                        </MainPageDownInput>
                        <div>
                            <TitleButton>
                                <IoSearchOutline />
                            </TitleButton>
                        </div>
                    </MainPageDownWrap>
            </MainPageDown>
        </MainPageContainer>
    );
}
