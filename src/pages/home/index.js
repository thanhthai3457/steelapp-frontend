import React, { useMemo } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './index.scss'

const Home = React.memo((props) => {
  const { navigations } = props

  const navLink = useMemo(
    () =>
      navigations.components.map((e, i) => (
        <Nav.Link key={i}>{e.title}</Nav.Link>
      )),
    [navigations]
  )

  const contentMenu = useMemo(
    () =>
      navigations.components.map((e, i) => (
        <div id={e.title} key={i} className='session'>
          <div className='top'>
            <div>
              <p className='title-top'>{e.title}</p>
            </div>
          </div>
          <div className='grid-wrapper'>
            {e.children.map((elem, idx) => (
              <div
                className='grid-item'
                key={idx}
                style={{
                  gridRowStart: 'span 1',
                  gridColumnStart: 'span 1',
                  height: '150px',
                  width: '180px'
                }}
              >
                <div className='name'>{elem.name}</div>
              </div>
            ))}
          </div>
        </div>
      )),
    [navigations]
  )

  return (
    <>
      <Navbar bg='white'>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>{navigations ? navLink : <></>}</Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        style={{
          height: '700px'
        }}
      >
        <div
          style={{
            backgroundColor: '#F2F2F2',
            height: '100%',
            padding: '10px',
            overflow: 'auto'
          }}
        >
          {contentMenu}
        </div>
      </div>
    </>
  )
})

export default Home
