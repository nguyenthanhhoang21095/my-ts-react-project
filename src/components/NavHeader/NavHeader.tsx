import React, { useState, useEffect } from 'react'
import { Button, Drawer, Row, Col } from 'antd'
import styles from './NavHeader.module.scss'
import classNames from 'classnames'
import NavCart from './NavCart/NavCart'
import NavCategory from './NavCategory/NavCategory'

interface NavHeaderProps {

}

const NavHeader: React.FC<NavHeaderProps> = (): JSX.Element => {
    const [showDrawer, setShowDrawer] = useState(false)

    useEffect(() => {
        return () => {
            setShowDrawer(false);
        }
    }, []);

    const handleShowDrawer = (drawerStatus: boolean): void => {
        setShowDrawer(!drawerStatus)
    }

    const handleCloseDrawer = (): void => {
        setShowDrawer(false)
    }


    return (
        <>
            <Row className={styles["navheader"]} justify="space-between">
                <Col span={12} className={styles["navheader-left"]}>
                    <Button
                        className={styles["navheader-left__button"]}
                        onClick={() => handleShowDrawer(showDrawer)}
                    >
                        {showDrawer ?
                            <i aria-hidden className={classNames("fas fa-arrow-left", "rotate-arrow", styles["navheader-left__button--icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-bars", "rotate-nav", styles["navheader-left__button--icon"])}></i>
                        }
                        <span className={styles["navheader-left__button--text"]}>Brand</span>
                    </Button>
                </Col>
                <Col span={12} className={styles["navheader-right"]}>
                    <NavCart />
                </Col>
            </Row>
            <Drawer
                title="Basic Drawer"
                placement='left'
                closable={false}
                onClose={handleCloseDrawer}
                visible={showDrawer}
                key='drawer'
                className={styles["navheader-drawer"]}
                bodyStyle={{ padding: 0 }}
            >
                <NavCategory />
            </Drawer>
        </>
    )
}

export default NavHeader