import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styles from './NavCart.module.scss'
import classNames from 'classnames'
import CartMenu from "../../Header/Cart/CartMenu";
import storageActions from 'controllers/redux/actions/storageActions'
import AccountMenu from "../../Header/Account/AccountMenu"

interface NavCartProps {
    cart: any[];
}

const NavCart: React.FC<NavCartProps> = ({ cart }): JSX.Element => {
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showCartMenu, setShowCartMenu] = useState(false)
    const accRef = useRef()
    const cartRef = useRef()

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            const accParentElm: any = accRef.current
            const cartParentElm: any = cartRef.current

            if (showAccountMenu && accRef.current && !accParentElm.contains(e.target)) {
                setShowAccountMenu(false);
            }
            if (showCartMenu && cartRef.current && !cartParentElm.contains(e.target)) {
                setShowCartMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
            // close popup when unmount 
        }
    }, [showAccountMenu, showCartMenu])


    return (
        <>
            <div
                className={styles["cart-dropdown"]}
            >
                <button
                    className={styles["cart-dropdown__button"]}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAccountMenu(false);
                        setShowCartMenu(true);
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-shopping-cart", styles["cart-dropdown__button--icon"])}></i>
                    <p className={styles["cart-dropdown__button--total"]}>
                        {cart.length}
                    </p>
                </button>
                {showCartMenu &&
                    <div 
                        className={styles["navcart-popup"]}
                        ref={cartRef}
                    >
                        <CartMenu cartList={cart} />
                    </div>
                }
            </div>

            <div
                className={styles["account-dropdown"]}
            >
                <button
                    className={styles["account-dropdown__button"]}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowCartMenu(false);
                        setShowAccountMenu(true);
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-cog", styles["account-dropdown__button--icon"])}></i>
                    {showAccountMenu && 
                        <div 
                            className={styles["navcart-popup"]} 
                            ref={accRef}
                            style={{ 
                                padding: 0,
                            }}
                        >
                            <AccountMenu />
                        </div>
                    }
                </button>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavCart);