import React from 'react';
import { StyledLink } from "./Link.styled"
import Link from 'next/link'
interface LinkProps {
    url?: string,
    text: string,
    customStyle?: string,
    // onClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const CustomLink:React.FC<LinkProps> = ({url = "", text="", customStyle=""}) => {
    return (
        <Link href={url}>
            <StyledLink customStyle={customStyle}>{text}</StyledLink>
        </Link>
    )
}

export default CustomLink;