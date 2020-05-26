import React from 'react'
import Background from '../../assets/images/background.png'
import NavLayout from './navbar'

const Layout = props => {
  const { children, history } = props

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
      <NavLayout />
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
