import React, { useCallback, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { CommonContext } from 'tools'

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      accessToken
    }
  }
`

const NormalLoginForm = (props) => {
  const [form] = Form.useForm()
  const [Login] = useMutation(LOGIN_USER)
  const context = useContext(CommonContext)

  const handleEnter = useCallback(() => {
    const { getFieldsValue } = form
    const { username, password } = getFieldsValue()
    Login({ 
      variables: {
        input: {
          username,
          password
        }
      }
    }).then(res => {
      const { accessToken } = res.data.login
      localStorage.setItem('access-token', accessToken)
      context.dispatch({
        type: 'login',
        payload: true
      })
      NotificationManager.success(
        'Đăng nhập thành công!',
        'Success!',
        2000
      )
    }).catch(err => {
      console.log(err)
      NotificationManager.error(
        'Sai tài khoản hoặc mật khẩu!',
        'Có lỗi xảy ra!',
        2000
      )
    })
  }, [form, Login, context])

  const handlePress = useCallback(keyCode => {
    if (keyCode === 13) {
      handleEnter()
    }
  }, [handleEnter])

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
            onKeyDown={e => handlePress(e.keyCode)}
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
            onKeyDown={e => handlePress(e.keyCode)}
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
        <NotificationContainer />
      </Form>
    </>
  )
}

const LoginForm = (NormalLoginForm)

export default withRouter(LoginForm)