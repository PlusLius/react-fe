import { Layout, Spin } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Logo from '../../components/Logo'
import UserInfo from '../../components/UserInfo'
import useLoadUserData from '../../hooks/useLoadUserData'
import useNavPage from '../../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
    const { watingUserData } = useLoadUserData()
    useNavPage(watingUserData)

    return <Layout>
        <Header className={styles.header}>
            <div className={styles.left}>
                <Logo></Logo>
            </div>
            <div className={styles.right}>
                <UserInfo />
            </div>
        </Header>
        <Layout className={styles.main}>
            <Content>
            {watingUserData ? (<div style={{textAlign:'center', marginTop:'60px'}}>
                <Spin/>
            </div>) : (<Outlet />)}
            </Content>
        </Layout>
        <Footer className={styles.footer}>
            问卷 &copy; 2023 - present. Created by Plus
        </Footer>
    </Layout>
}

export default MainLayout