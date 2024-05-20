import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

const HeaderContainer = styled.div`
    background-color: rgba(3, 37, 65, 1);
    /*헤더 고정시키기 위한 속성*/
    position: fixed;
    top: 0; /* 화면의 맨 위에 고정 */
    left: 0;
    width: 100%; /* 화면 전체의 너비를 차지 */
    z-index: 1000; /* 다른 요소 위에 표시하기 위해 z-index 설정 */
`

const Headerwrap = styled.div`
    height: 50px; /*높이*/
    width: 100%;
    margin: 0 auto; /* 가운데 정렬 하기 위해 */

    display: flex; /*세로 정렬 위해서*/
    align-items: center; /*세로 정렬 위해서*/
    justify-content: space-between; /*wrap right 와 left 분산 정렬*/
`
const HeaderLeftWrap = styled.div`
    display: flex;
    margin-right: 14px; /*버튼 따닥따닥 붙어 있는거 띄워주기*/
    padding: 8px;/*버튼 선택 영역 늘리기*/
`

const HeaderRightWrap = styled.div`
    display: flex;
    
    ul {
        display: flex;
        list-style: none; /* 리스트 마커 제거 */
        padding: 0;
        margin: 0;
    }
    
    li {
        margin-right: 14px;
        padding: 8px;
        color: white;
        font-size: 1rem;
    }
    li: hover {
        font-weight: bold;
        font-size: 110%;
    }
   
`;

const UMCMovieLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-weight: 700;
`;

const HeadernavItem = styled(Link)`
    color: white;
    text-decoration: none;
    font-weight: 300;
   
    
`;

export default function Header(){
    return(
        <HeaderContainer>
            <Headerwrap>
                <HeaderLeftWrap>
                    <UMCMovieLink to='/'>
                        UMC Movie
                    </UMCMovieLink>
                </HeaderLeftWrap>
                <HeaderRightWrap>
                    <ul>
                        <li>
                            <HeadernavItem to='/' >
                                login
                            </HeadernavItem>
                        </li>
                        <li>
                            <HeadernavItem to='/popularpage'>
                                Popular
                            </HeadernavItem>
                        </li>
                        <li>
                            <HeadernavItem to='/nowplayingpage'>
                                Now Playing
                            </HeadernavItem>
                        </li>
                        <li>
                            <HeadernavItem to='/topratedpage'>
                                Top Rated
                            </HeadernavItem>
                        </li>
                        <li>
                            <HeadernavItem to='/upcomingpage'>
                                Upcoming
                            </HeadernavItem>
                        </li>
                    </ul>
                </HeaderRightWrap>
            </Headerwrap>

        </HeaderContainer>
    )
}

