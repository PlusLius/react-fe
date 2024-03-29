import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'
const { Title } = Typography

const Login: FC = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        const { username, password } = getUserInfoFromStorage()

        form.setFieldsValue({ username, password })
    }, [])
    const USERNAME_KEY = 'USERNAME'
    const PASSWORD_KEY = 'PASSWORD'
    const rememberUser = (username: string, password: string) => {
        localStorage.setItem(USERNAME_KEY, username)
        localStorage.setItem(PASSWORD_KEY, password)
    }
    const deleteUserFromStorage = () => {
        localStorage.removeItem(USERNAME_KEY)
        localStorage.removeItem(PASSWORD_KEY)
    }
    const getUserInfoFromStorage = () => {
        return {
            username: localStorage.getItem(USERNAME_KEY),
            password: localStorage.getItem(PASSWORD_KEY)
        }
    }
    const onFinish = (value: any) => {
        console.log(value);
        const { username, password, remember } = value
        run(value)
        if (remember) {
            rememberUser(username, password)
        } else {
            deleteUserFromStorage()
        }
    }
    const { run } = useRequest(async (values) => {
        const { username, password } = values
        const data = await loginService(username, password)
        return data
    }, {
        manual: true,
        onSuccess(res){
            const { token } = res
            setToken(token)
            message.success('登录成功')
            nav(MANAGE_INDEX_PATHNAME)
        }
    })
    return <div className={styles.container}>
        <div>
            <Space>
                <Title level={2}><UserAddOutlined /></Title>
                <Title level={2}>用户登录</Title>
            </Space>
        </div>
        <div>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item label="用户名" name="username" rules={[
                    {
                        required: true,
                        message: '请输入用户名'
                    },
                    {
                        type: 'string',
                        min: 5,
                        max: 20,
                        message: '字符长度在 5-20 之间'
                    },
                    {
                        pattern: /^\w+$/,
                        message: '只能是字母数字下划线'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked' initialValue={{ remember: true }} wrapperCol={{ offset: 6, span: 18 }}>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Space>
                        <Button type='primary' htmlType='submit'>登录</Button>
                        <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Login