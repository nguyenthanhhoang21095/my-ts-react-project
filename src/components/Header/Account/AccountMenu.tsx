import React from 'react'
import styles from "./AccountMenu.module.scss"
import Link from 'next/link'

interface AccountMenuProps {
}

const AccountMenu: React.FC<AccountMenuProps> = (): JSX.Element => {
    return (
        <ul className={styles["account-menu"]}>
            <Link href="/auth/register">
                <li key="1" className={styles["account-menu__item"]}>
                    Register
                </li>
            </Link>
            <Link href="/auth/login">
                <li key="2" className={styles["account-menu__item"]}>
                    Sign in
                </li>
            </Link>
        </ul>
    )
}

export default AccountMenu
