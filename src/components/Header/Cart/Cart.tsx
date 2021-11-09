import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'antd'
import styles from './Cart.module.scss'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

interface CartProps {
    isSearching: boolean,
    setIsSearching: any
}

const Cart: React.FC<CartProps> = ({ isSearching, setIsSearching }): JSX.Element => {
    const isLargeDevice = useMediaQuery({ query: '(min-width: 1280px)' })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])
    return ( mounted && 
        <Row className={styles["cart"]} justify="end">
            <Col
                offset={4}
                xl={4} lg={4} md={6} sm={6}
                className={styles["cart-col"]}
            >
                <div
                    className={styles["cart-col__button"]}
                    onClick={() => setIsSearching(!isSearching)}
                >
                    {
                        isSearching ?
                            <i aria-hidden className={classNames("fas fa-times", styles["cart-col__button--icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-search", styles["cart-col__button--icon"])}></i>
                    }
                </div>
            </Col>
            <Col
                xl={6} lg={4} md={6} sm={4}
                className={classNames(styles["cart-col"], styles["cart-hide-nav"])}
            >
                <Button
                    type="link"
                    href="https://www.google.com/"
                    className={styles["cart-col__setting"]}
                >
                    <i aria-hidden className={classNames("fas fa-shopping-cart", styles["cart-col__setting--icon"])}></i>
                    {isLargeDevice && <span className={styles["cart-col__setting--text"]}>0 item(s)</span>}
                </Button>
            </Col>
            <Col
                xl={6} lg={4} md={6} sm={4}
                className={classNames(styles["cart-col"], styles["cart-hide-nav"])}
            >
                <Button
                    type="link"
                    href="https://www.google.com/"
                    className={styles["cart-col__setting"]}
                >
                    <i aria-hidden className={classNames("fas fa-user", styles["cart-col__setting--icon"])}></i>
                    {isLargeDevice && <span className={styles["cart-col__setting--text"]}>Account</span>}
                </Button>
            </Col>
        </Row>
    )
}

export default Cart;