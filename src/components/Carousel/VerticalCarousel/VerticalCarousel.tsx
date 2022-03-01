import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import styles from './VerticalCarousel.module.scss'
import classNames from 'classnames';
import { UpOutlined, DownOutlined } from '@ant-design/icons'

interface VerticalCarouselProps {
    data: string[];
    renderProps: any;
    handleClick: any;
    activeItem: string;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ data, renderProps, handleClick, activeItem }): JSX.Element => {
    const [scrollVal, setScrollVal] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [elmHeight, setElmHeight] = useState(0);

    const parentElm = useRef(null);
    const containerElm = useRef(null);
    const scrollElm = useRef(null);

    const handleChooseUpItem = ():void => {
        if (scrollVal <= 0) {
            if (Math.abs(scrollVal) > elmHeight) {
                setScrollVal(scrollVal + elmHeight);
            } else {
                setScrollVal(0);
            }
        }
    }

    const handleChooseDownItem = ():void => {
        const downVal = scrollHeight - containerHeight - Math.abs(scrollVal);
        if (downVal >= 0) {
            if (downVal - elmHeight >= 0) {
                setScrollVal(scrollVal - elmHeight);
            } else {
                setScrollVal(scrollVal - downVal);
            }
        }
    }

    const getHeightInfo = ():void => {
        parentElm?.current && setScrollHeight(parentElm.current.scrollHeight);
        containerElm?.current && setContainerHeight(containerElm.current.clientHeight);
        scrollElm?.current && setElmHeight(scrollElm.current.clientHeight);
    }

    useEffect(() => {
        const handleResize = ():void => {
            getHeightInfo();
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        getHeightInfo();
    }, [])

    return (
        <div className={styles["vertical-carousel"]}>
            <section className={styles["vertical-carousel__outer"]}>
                <div className={styles["vertical-carousel__outer--wrapper"]}>
                    <button
                        className={styles["carousel-button"]}
                        onClick={handleChooseUpItem}
                    >
                        <UpOutlined />
                    </button>

                    <div className={styles["carousel-content"]}
                        ref={containerElm}
                    >
                        <div
                            className={styles["carousel-slide"]}
                        >
                            <div
                                className={styles["carousel-slide__inner"]}
                                ref={parentElm}
                            >
                                {data.length && data.map((item, idx) => (
                                    <div
                                        ref={idx == 0 ? scrollElm : null}
                                        className={classNames(
                                            styles["carousel-item"],
                                            { [styles["last-item"]]: idx === data.length - 1 },
                                            { [styles["first-item"]]: idx === 0 },
                                            { [styles["active-item"]]:  item === activeItem }
                                        )}
                                        key={idx}
                                        style={{
                                            transform: `translateY(${scrollVal}px)`,
                                            transition: "all .3s ease",
                                            scrollBehavior: "smooth"
                                        }}
                                        onClick={() => handleClick(item)}
                                    >
                                        {renderProps(item)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className={styles["carousel-button"]}
                        onClick={handleChooseDownItem}
                    >
                        <DownOutlined />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default VerticalCarousel;