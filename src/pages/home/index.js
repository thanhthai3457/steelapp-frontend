import React, { useMemo, useCallback } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './index.scss'

const Home = React.memo((props) => {
  const { navigations } = props

  const handleClickNavBar = useCallback((val) => {
    const sessionView = document.querySelector(`#${val}`)
    const wrapper = document.querySelector(`.dash-child`)
    wrapper.scrollTo({
      top: sessionView.offsetTop - 120,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  const handleClickGrid = useCallback((val) => {
    props.history.push(`${val}`)
  }, [props])

  const navLink = useMemo(
    () =>
      navigations.components.map((e, i) => (
        <Nav.Link
          key={i}
          onClick={() => handleClickNavBar(e.id)}
        >
          {e.title}
        </Nav.Link>
      )),
    [navigations, handleClickNavBar]
  )

  const contentMenu = useMemo(
    () =>
      navigations.components.map((e, i) => (
        <div id={e.id} key={i} className='session'>
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
                onClick={() => handleClickGrid(elem.dest)}
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
    [navigations, handleClickGrid]
  )

  return (
    <>
      <Navbar bg='white'>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>{navigations ? navLink : <></>}</Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        className='dash-container'
        style={{
          height: window.innerHeight - 100
        }}
      >
        <div
          className='dash-child'
          style={{
            backgroundColor: '#F2F2F2',
            height: '120%',
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
