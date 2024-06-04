import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from '../hooks/LoginContext';

const HeaderContainer = styled.div`
    background-color: rgba(3, 37, 65, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
`;

const Headerwrap = styled.div`
    height: 50px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderLeftWrap = styled.div`
    display: flex;
    margin-right: 14px;
    padding: 8px;
`;

const HeaderRightWrap = styled.div`
    display: flex;
    
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    li {
        margin-right: 14px;
        padding: 8px;
        color: white;
        font-size: 1rem;
    }
    li:hover {
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

export default function Header() {
    const { isLoggedIn, logout } = useContext(LoginContext);

    return (
        <HeaderContainer>
            <Headerwrap>
                <HeaderLeftWrap>
                    <UMCMovieLink to='/'>
                        UMC Movie
                    </UMCMovieLink>
                </HeaderLeftWrap>
                <HeaderRightWrap>
                    <ul>
                        {isLoggedIn ? (
                            <li>
                                <HeadernavItem to='/' onClick={logout}>
                                    로그아웃
                                </HeadernavItem>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <HeadernavItem to='/loginpage'>
                                        로그인
                                    </HeadernavItem>
                                </li>
                                <li>
                                    <HeadernavItem to='/signuppage'>
                                        회원가입
                                    </HeadernavItem>
                                </li>
                            </>
                        )}
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
    );
}
