import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

const NormalLoginForm = (props) => {
  const [form] = Form.useForm()

  const handleEnter = useCallback(keyCode => {
    const { getFieldValue } = form
    if (keyCode === 13 || !keyCode) {
      console.log(getFieldValue())
    }
  }, [form])

  const forgotPass = useCallback(() => {
    console.log('forgot')
  }, [])

  return (
    <>
      <Form
        className='loginForm'
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name='username'
          rules={[
            { required: true, message: 'Vui lòng nhập tên đăng nhập' },
            {
              pattern: /^[^\s]/,
              message: 'Không được có dấu cách đầu dòng'
            }
          ]}
        >
          <Input
            placeholder="Tên đăng nhập"
            spellCheck={false}
            onKeyDown={e => handleEnter(e.keyCode)}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' }
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            spellCheck={false}
            onKeyDown={e => handleEnter(e.keyCode)}
          />
        </Form.Item>
        <Form.Item>
          <p
            className='forgotPass'
            onClick={forgotPass}
          > 
            Quên mật khẩu
          </p>
        </Form.Item>
        <Form.Item>
          <Button
            block
            className="submitLogin"
            style={{ height: 46, width: '100%' }}
            type='primary'
            htmlType="submit"
            onClick={() => handleEnter()}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const LoginForm = (NormalLoginForm)

export default withRouter(LoginForm)