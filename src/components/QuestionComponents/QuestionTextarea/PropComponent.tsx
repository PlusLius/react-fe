import React, { FC, useEffect } from 'react'
import { QuestionTextAreaPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
    const { title, placeholder, onChange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            title,
            placeholder
        })
    }, [title, placeholder])

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            disabled={disabled}
            form={form}
            layout='vertical'
            initialValues={{ title, placeholder }}
            onChange={handleValueChange}
        >
            <Form.Item label="标题" name="title" rules={[
                {
                    required: true,
                    message: '请输入标题'
                }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default PropComponent