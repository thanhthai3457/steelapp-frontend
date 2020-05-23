import React from 'react'
import Background from '../../assets/images/background.png'

const Layout = props => {
  const { children, history } = props
  console.log('layout', children, history)

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <h1>Đây là header</h1>
      {React.cloneElement(children, {
        currentProfile: {
          name: 'Thanh',
          mobile: '077-357-3457'
        }
      })}
    </div>
  )
}

export default Layout
