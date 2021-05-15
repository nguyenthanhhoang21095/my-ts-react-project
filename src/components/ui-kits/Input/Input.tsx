import React from 'react'
import { 
    StyledInputContainer, 
    StyledInput,
    StyledLabel,
    StyledBar,
    StyledHighLight,
 } from "./Input.styled"

interface InputProps {
    type: string;
    labelName: string;
}

const Input: React.FC<InputProps> = ({ type = "text", labelName = ""}):JSX.Element => {
    return (
        <StyledInputContainer>
            <StyledInput type={type} />
            <StyledLabel>{labelName}</StyledLabel>
            <StyledBar className="bar"></StyledBar>
            <StyledHighLight className="highlight"></StyledHighLight>
        </StyledInputContainer>
    )
}
export default Input;