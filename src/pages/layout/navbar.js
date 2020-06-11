import React, { useState, useMemo, useEffect } from 'react'
import gql from 'graphql-tag'
import { graphql } from '@apollo/react-hoc'
import { Navbar, Form, Nav, NavDropdown } from 'react-bootstrap'
import { Select } from 'antd'

const { Option } = Select

const NavLayout = props => {
  const [optsStore, setOptsStore] = useState([])
  
  useEffect(() => {
    if (props.data.getStores) {
      setOptsStore(props.data.getStores)
    }
  }, [props.data])

  const options = useMemo(() => (
    optsStore.map((e, i) => (
      <Option key={i}>{e.name}</Option>
    ))
  ), [optsStore])

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
              {options}
            </Select>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default graphql(gql`
  query {
    getStores {
      _id
      code
      name
    }
  }
`)(NavLayout)
