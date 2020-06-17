import React, { useRef } from 'react'
import Background from '../../assets/images/background.png'
import NavLayout from './navbar'
import Preloader from 'components/preloader'

const Layout = props => {
  const { children, history } = props
  const preloaderRef = useRef(null)
  const navigationsRef = useRef({
    name: 'Default',
    components: [
      {
        title: 'Danh mục',
        children: [
          {
            name: 'Khách hàng',
            dest: '/customers'
          },
          {
            name: 'Nhà cung cấp',
            dest: '/vendors'
          },
          {
            name: 'Kho',
            dest: '/stores'
          },
          {
            name: 'Hàng hóa',
            dest: '/stockModels'
          },
        ]
      },
      {
        title: 'Bán hàng',
        children: [
          {
            name: 'Bán lẻ',
            dest: '/retail'
          },
          {
            name: 'Bán sỉ',
            dest: '/wholeSale'
          }
        ]
      },
      {
        title: 'Báo cáo',
        children: [
          {
            name: 'Báo cáo bán lẻ',
            dest: '/retailReport'
          },
          {
            name: 'Báo cáo tài chính',
            dest: '/financialReport'
          }
        ]
      }
    ]
  })

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
        navigations: navigationsRef.current,
        preloader: preloaderRef
      })}
      <Preloader ref={preloaderRef} />
    </div>
  )
}

export default Layout
