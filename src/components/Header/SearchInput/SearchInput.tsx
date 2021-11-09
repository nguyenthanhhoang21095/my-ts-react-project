import React, { useState, useRef, useEffect } from 'react'
import styles from './SearchInput.module.scss'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames'

interface SearchProps {
    isSearching: boolean;
}

const SearchInput: React.FC<SearchProps> = ({ isSearching }):JSX.Element => {
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isSearching && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [])

    const handleSearch = (e:any):void => {
        const text:string = e.target.value;
        setSearchText(text);
    }

    const handleSubmitSearch = ():void => {
        if (searchText) {

            // handle call api with search text
        }
    }

    return (
        <div className={styles["search-container"]}>
            <Input 
                ref={inputRef}
                size="large" 
                className={classNames({"fade-in-right": isSearching }, styles["search-container__input"])}
                placeholder="Search entire store here" 
                prefix={
                    <SearchOutlined 
                        className={styles["search-container__input--icon"]}
                    />
                } 
                value={searchText}
                onChange={handleSearch}
            />
            <Button 
                type="primary"
                size="large"
                className={styles["search-container__button"]}
                onClick={handleSubmitSearch}
            >
                Search
            </Button>
        </div>
    )
}

export default SearchInput;

