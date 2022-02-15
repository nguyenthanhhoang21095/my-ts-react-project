import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout/Layout'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/detail.module.scss'
import classNames from 'classnames'
import { Row, Col } from 'antd'
import { useMediaQuery } from 'react-responsive';

interface SubCategoryPageProps {
    data: any;
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = ({ data }): JSX.Element => {
    return (
        <Layout>
            <div className={styles['category']}>
                Sub-Category
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            data: [],
        },
    }
}


export default SubCategoryPage;