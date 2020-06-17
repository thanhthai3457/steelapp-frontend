import React, { useMemo } from 'react'
import { Navbar, Nav, Form, Col } from 'react-bootstrap'

const Home = React.memo(props => {
  const { menuNav: { linkNav } } = props

  const navLink = useMemo(() => (
    linkNav.map((e, i) => (
      <Nav.Link key={i} id={e}>{e}</Nav.Link>
    ))
  ), [linkNav])

  const contentMenu = useMemo(() => (
    linkNav.map((e, i) => (
      <div
        id={e}
        key={i}
      >
        <h3>{e}</h3>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Remember me"
              />
            </Col>
          </Form.Row>
        </Form>
      </div>
    ))
  ), [linkNav])
  
  console.log(navLink)

  return (
    <>
      <Navbar bg='white'>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {linkNav ? (
              navLink
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        style={{
          backgroundColor: '#F2F2F2',
          height: '100vh'
        }}
      >
        {contentMenu}
      </div>
    </>
  )
})

export default Home
