import React from "react";
import styled from "styled-components"; 
import { Link } from "react-router-dom";

const NotFoundText = styled.div`
    text-align: center; /* 텍스트 정렬 속성 수정 */
    color: white;
    background-color: rgba(3, 37, 65, 1); /* 배경색 추가 */
    min-height: 100vh; /* 화면 전체 높이 설정 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`

const StyledLink = styled(Link)`
    text-decoration: none; /* 링크 밑줄 제거 */
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 20px;
    color: white;
`

function NotFound() {
    return (
        <NotFoundText>
            <h1>Oops!</h1>
            <h4>예상치 못한 에러가 발생했습니다</h4>
            <h4>Not Found</h4>
            <StyledLink to="/">메인으로 이동하기</StyledLink>
        </NotFoundText>
    );
}

export default NotFound;
