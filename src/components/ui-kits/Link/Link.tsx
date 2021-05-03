import React from 'react';
import { StyledLink } from "./Link.styled"

interface LinkProps {
    url?: string,
    text: string,
    // onClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const Link:React.FC<LinkProps> = ({url = "", text=""}) => {
    return (
        <StyledLink href={url}>{text}</StyledLink>
    )
}

export default Link;