import React, { useState, useEffect, useRef } from 'react'
import styles from './NavCart.module.scss'
import classNames from 'classnames'

interface CartMenuProps {
}

interface AccountMenuProps {
}

interface NavCartProps {
}

const AccountMenu: React.FC<AccountMenuProps> = (): JSX.Element => {
    return (
        <ul className={styles["account-menu"]}>
            <li key="1" className={styles["account-menu__item"]}>
                Register
            </li>
            <li key="2" className={styles["account-menu__item"]}>
                Sign in
            </li>
        </ul>
    )
}

const CartMenu: React.FC<CartMenuProps> = (): JSX.Element => {
    return (
        <ul className={styles["cart-menu"]}>
            <li key="1" className={styles["cart-menu__item"]}>
                EMPTY!
            </li>
        </ul>
    )
}

const NavCart: React.FC<NavCartProps> = (): JSX.Element => {
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

    const handleShowAccountMenu = (cartMenuStatus: boolean, accountMenuStatus: boolean): void => {
        if (cartMenuStatus) {
            setShowCartMenu(false);
        }
        setShowAccountMenu(!accountMenuStatus);
    }

    const handleShowCartMenu = (accountMenuStatus: boolean, cartMenuStatus: boolean): void => {
        if (accountMenuStatus) {
            setShowAccountMenu(false);
        }
        setShowCartMenu(!cartMenuStatus);
    }

    return (
        <>
            <div
                className={styles["cart-dropdown"]}
                ref={cartRef}
            >
                <button
                    className={styles["cart-dropdown__button"]}
                    onClick={() => handleShowCartMenu(showAccountMenu, showCartMenu)}
                >
                    <i aria-hidden className={classNames("fas fa-shopping-cart", styles["cart-dropdown__button--icon"])}></i>
                    <div className={styles["cart-dropdown__button--total"]}>
                        <p>0</p>
                    </div>
                </button>
                {showCartMenu && <CartMenu />}
            </div>

            <div
                className={styles["account-dropdown"]}
                ref={accRef}
            >
                <button
                    className={styles["account-dropdown__button"]}
                    onClick={(e) => {
                        e.preventDefault();
                        handleShowAccountMenu(showCartMenu, showAccountMenu)
                    }
                    }
                >
                    <i aria-hidden className={classNames("fas fa-cog", styles["account-dropdown__button--icon"])}></i>
                    {showAccountMenu && <AccountMenu />}
                </button>
            </div>
        </>
    )
}

export default NavCart