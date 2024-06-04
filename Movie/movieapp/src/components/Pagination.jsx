import React from "react";
import styled from "styled-components"; 


const PageNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    margin-top: 20px;
    margin-bottom: 50px;
`;

const Arrow = styled.div `
    cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  margin: 0 10px;

`;

const Number = styled.div`
    margin: 0 10px;
    font-size: 18px;
`;




export default function Pagination({ page, setPage, totalPages }){
    console.log('Pagination component rendered');

    return(
        <PageNumber>
            <Arrow disabled={page === 1} onClick={() => page > 1 && setPage(page-1)}>
                {"<"}
            </Arrow>
            <Number>{page}</Number>
            <Arrow disabled={page === totalPages} onClick={() => page < totalPages && setPage(page + 1)}>
                {">"}
            </Arrow>
        </PageNumber>

)
    
}