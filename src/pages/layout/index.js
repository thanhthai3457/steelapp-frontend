import React, { useRef } from 'react'
import Background from '../../assets/images/background.png'
import NavLayout from './navbar'
import Preloader from 'components/preloader'

const Layout = props => {
  const { children, history } = props
  const preloaderRef = useRef(null)

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
      <NavLayout history={history} preloader={preloaderRef} />
      {React.cloneElement(children, {
        currentProfile: {
          name: 'Thanh',
          mobile: '077-357-3457'
        },
        preloader: preloaderRef
      })}
      <Preloader ref={preloaderRef} />
    </div>
  )
}

export default Layout
