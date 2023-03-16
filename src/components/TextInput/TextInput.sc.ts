import styled from "styled-components";

export const TextInput = styled("label")`
    display: block;
`;

const InputLabels = styled("span")`
    font-size: 12px;
    line-height: 1.5;
    color: #eee;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Label = styled(InputLabels)<{ active?: boolean }>`
    margin-top: -9px;
    position: absolute;
    top: ${({ active }) => (active ? "16px" : "50%")};
    left: 16px;
    right: 16px;
    transition: top 0.2s;

    input:focus + & {
        top: 16px;
    }
`;

export const Affix = styled(InputLabels)`
    padding: 16px;
`;

export const ErrorMessage = styled("div")`
    color: orangered;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1;
`;

export const InputBlock = styled("div")<{
    isDisabled: boolean;
    isInvalid: boolean;
    isFocused: boolean;
}>`
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    transition: box-shadow 0.3s, border 0.3s;
    background-color: ${({ isDisabled }) => (isDisabled ? "#222" : "#333")};
    box-shadow: 0 0 0 ${({ isFocused }) => (isFocused ? 4 : 0)}px
        ${({ isInvalid }) =>
            isInvalid ? "rgba(255,0,0,0.33)" : "rgba(0,0,255,0.33)"};
    border: 2px solid
        ${({ isInvalid, isFocused }) =>
            isInvalid
                ? "OrangeRed"
                : isFocused
                ? "RoyalBlue"
                : "LightSlateGray"};
`;

export const Input = styled("input")<{ inputSize: string }>`
    box-sizing: border-box;
    display: block;
    flex-grow: 1;
    margin: 0;
    padding: 16px;
    font-weight: 400;
    line-height: 1;
    border: none;
    outline: none;
    background-color: transparent;
    padding-top: ${({ inputSize }) => (inputSize === "regular" ? 46 : 20)}px;
    font-size: ${({ inputSize }) => (inputSize === "regular" ? 18 : 16)}px;
    height: ${({ inputSize }) => (inputSize === "regular" ? 80 : 48)}px;

    &:disabled {
        color: black;
    }
`;
