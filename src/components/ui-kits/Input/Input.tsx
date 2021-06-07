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
    value: string;
    handleChange: (e?: any) => void,
    customStyle?: string;
}

const Input: React.FC<InputProps> = ({ type = "text", labelName = "", value = "", handleChange = () => {}, customStyle=""}):JSX.Element => {
    return (
        <StyledInputContainer customStyle={customStyle}>
            <StyledLabel>{labelName}</StyledLabel>
            <StyledInput type={type} value={value} onChange={handleChange}/>
            <StyledBar className="bar"></StyledBar>
            <StyledHighLight className="highlight"></StyledHighLight>
        </StyledInputContainer>
    )
}
export default Input;