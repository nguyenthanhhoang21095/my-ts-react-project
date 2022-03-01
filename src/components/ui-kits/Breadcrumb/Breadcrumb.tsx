import React from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import styles from "./Breadcrumb.module.scss"
import Link from 'next/link'

interface CustomBreadcrumbProps {
    itemName: string;
}

const CustomBreadcrumb:React.FC<CustomBreadcrumbProps> = ({ itemName }):JSX.Element => {
  return (
    <div className={styles['custom-breadcrumb']}>
    <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link href="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
      <Breadcrumb.Item>{itemName}</Breadcrumb.Item>
    </Breadcrumb>
  </div>
  )
}

export default CustomBreadcrumb