import React from 'react'
import { Navbar, Form, Nav, NavDropdown } from 'react-bootstrap'
import { Select } from 'antd'

const { Option } = Select

const NavLayout = props => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <Select
              style={{ width: 300 }}
            >
              <Option key='1'>CH 1</Option>
              <Option key='2'>CH 2</Option>
            </Select>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavLayout
