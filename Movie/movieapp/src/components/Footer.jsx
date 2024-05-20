import React from "react";
import styled from "styled-components"

const FooterWrap = styled.div`
    display: flex;
    justify-content: space-between; /* 내용을 왼쪽과 오른쪽에 분산 배치 */
    background-color: #373b69;
    height: 30px;
    position: fixed;
    bottom: 0; /* 화면의 맨 위에 고정 */
    left: 0;
    width: 100%; /* 화면 전체의 너비를 차지 */
    z-index: 1000; /* 다른 요소 위에 표시하기 위해 z-index 설정 */
    align-items: center;
`

const FooterLeftWrap = styled.div`
    color: white;
    padding: 10px;
`

const FooterRightWrap = styled.div`
    color: white;
    padding: 10px;
`

export default function Footer(){
    // 현재 사이트 주소 가져오기
    const currentUrl = window.location.href;

    // 항상 보여줄 URL
    const alwaysVisibleUrl = "https://www.makeus.in/umc";

    return(
        <div className="footer-container">
            <FooterWrap>
                <FooterLeftWrap>
                    Current Site: {currentUrl}
                </FooterLeftWrap>
                <FooterRightWrap>
                    Always Visible URL: <a href={alwaysVisibleUrl}>{alwaysVisibleUrl}</a>
                </FooterRightWrap>
            </FooterWrap>
        </div>
    )
}
