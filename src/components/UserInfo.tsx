import { userInfo } from 'os'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UsserInfo: FC = () => {
    // const { data } = useRequest(getUserInfoService) 
    // const { username, nickname } = data || {}
    const {username, nickname} = useGetUserInfo()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const logout = () => {
        dispatch(logoutReducer())
        removeToken()
        message.success('退出成功')
        nav(LOGIN_PATHNAME)
    }

    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8' }}>
                <UserOutlined />
                {nickname}
            </span>
            <Button type='link' onClick={logout}>退出</Button>
        </>
    )

    const Login = (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    )

    return <>
        <div>
            {username ? UserInfo : Login}
        </div>
    </>
}

export default UsserInfo