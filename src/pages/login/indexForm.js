import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

const NormalLoginForm = (props) => {
  const [form] = Form.useForm()

  const handleEnter = keyCode => {
    const { getFieldValue } = form
    if (keyCode === 13 || !keyCode) {
      console.log(getFieldValue())
    }
  }

  return (
    <>
      <Form
        className='login-form'
        form={form}
      >
        <Form.Item
          name='username'
          label='Tên đăng nhập'
          rules={[
            { required: true, message: 'Vui lòng nhâp tên đăng nhập' },
            {
              pattern: /^[^\s]/,
              message: 'Không được có dấu cách đầu dòng'
            }
          ]}
        >
          <Input
            size="large"
            placeholder="Tên đăng nhập"
            spellCheck={false}
            onKeyDown={e => handleEnter(e.keyCode)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            block
            className="submitLogin"
            style={{ height: 46, width: '100%' }}
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