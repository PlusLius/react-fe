import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography, message } from 'antd'
import React, { FC } from 'react'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getRegisterService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
    const onFinish = (value: any) => {
        run(value)

    }
    const nav = useNavigate()

    const { run } = useRequest(async (values) => {
        const { username, password, nickname } = values
        await getRegisterService(username, password, nickname)
    }, {
        manual:true,
        onSuccess(res){
            message.success('注册成功')
            nav(LOGIN_PATHNAME)
        }
    })

    return <div className={styles.container}>
        <Space>
            <Title level={2}><UserAddOutlined /></Title>
            <Title level={2}>注册新用户</Title>
        </Space>
        <div>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
            >
                <Form.Item label='用户名' name="username" rules={[
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
                <Form.Item label='密码' name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label='确认密码' name="confirm" dependencies={['password']} rules={[{ required: true, message: '请输入密码' },
                ({ getFieldValue }) => {
                    return {
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            } else {
                                return Promise.reject(new Error('两次密码不一致'))
                            }
                        }
                    }
                }
                ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label='昵称' name="nickname">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Space>
                        <Button type='primary' htmlType='submit'>注册</Button>
                        <Link to={LOGIN_PATHNAME}>已有账户，请登录</Link>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Register