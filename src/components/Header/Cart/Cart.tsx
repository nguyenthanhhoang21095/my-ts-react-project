import React, { useEffect, useState, useRef } from 'react'
import { Row, Col } from 'antd'
import { Button } from "src/components/ui-kits/Button"
import styles from './Cart.module.scss'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import storageActions from 'controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import CartMenu from "./CartMenu";
import AccountMenu from "../Account/AccountMenu";

interface CartProps {
    isSearching: boolean;
    setIsSearching: any;
    cart: any[];
}

const Cart: React.FC<CartProps> = ({ isSearching, setIsSearching, cart }): JSX.Element => {
    const isLargeDevice = useMediaQuery({ query: '(min-width: 1280px)' });
    const [showCartMenu, setShowCartMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const cartRef = useRef(null);
    const accountRef = useRef(null);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => {
          setMounted(false);
        }
    }, [])
    

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            const cartElm: any = cartRef.current;
            const accountElm: any = accountRef.current;

            if (showCartMenu && cartRef.current && !cartElm.contains(e.target)) {
                setShowCartMenu(false);
            }

            if (showAccountMenu && accountRef.current && !accountElm.contains(e.target)) {
                setShowAccountMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
            // close popup when unmount 
        }
    }, [showCartMenu, showAccountMenu])

    return (
        mounted && 
        <Row className={styles["cart"]} justify="end">
            <Col
                offset={4}
                xl={4} lg={4} md={6} sm={6}
                className={styles["cart-col"]}
            >
                <div
                    className={styles["cart-col__search"]}
                    onClick={() => setIsSearching(!isSearching)}
                >
                    {
                        isSearching ?
                            <i aria-hidden className={classNames("fas fa-times", styles["cart-col__search--icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-search", styles["cart-col__search--icon"])}></i>
                    }
                </div>
            </Col>
            <Col
                xl={6} lg={4} md={6} sm={4}
                className={classNames(styles["cart-col"], styles["cart-hide-nav"])}
            >
                <Button
                    handleClick={() => setShowCartMenu(true)}
                    style={{
                        color: "#000",
                        fontSize: "14px",
                        border: "none",
                        padding: 0,
                        background: "transparent",
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-shopping-cart", styles["cart-col__icon"])}></i>
                    {isLargeDevice && <span className={styles["cart-col__text"]}>{cart.length} item(s)</span>}
                </Button>
                {showCartMenu &&
                    <div className={styles["cart-popup"]} ref={cartRef}>
                        <CartMenu cartList={cart} />
                    </div>
                }
            </Col>
            <Col
                xl={6} lg={4} md={6} sm={4}
                className={classNames(styles["cart-col"], styles["cart-hide-nav"])}
            >
                <Button
                    handleClick={() => setShowAccountMenu(true)}
                    style={{
                        color: "#000",
                        fontSize: "14px",
                        border: "none",
                        padding: 0,
                        background: "transparent",
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-user", styles["cart-col__icon"])}></i>
                    {isLargeDevice && <span className={styles["cart-col__text"]}>Account</span>}
                </Button>
                {showAccountMenu &&
                    <div 
                        className={styles["cart-popup"]} 
                        ref={accountRef}
                        style={{ 
                            padding: 0,
                        }}
                    >
                        <AccountMenu />
                    </div>
                }
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.storage.cart
    }
}

const mapDispatchToProps = {
    getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);