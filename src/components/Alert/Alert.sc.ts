import styled from "styled-components";

export const AlertBackground = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Alert = styled("div")`
    display: flex;
    width: 100%;
    max-width: 480px;
    background: #222;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    flex-direction: column;
`;

export const Header = styled("div")`
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;

    & h2 {
        line-height: 1;
        margin: 0;
    }
`;

export const CloseBtn = styled("button")`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    line-height: 32px;
    font-size: 24px;
`;

export const Content = styled("div")`
    overflow-y: auto;
    padding: 16px;
`;
