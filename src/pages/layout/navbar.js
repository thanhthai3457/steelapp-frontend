import React, { useState, useMemo, useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { graphql } from '@apollo/react-hoc'
import { Navbar, Form, Nav } from 'react-bootstrap'
import { Select, Button } from 'antd'
import * as Icon from 'react-feather'
import { CommonContext } from 'tools'

const { Option } = Select

const NavLayout = props => {
  const [optsStore, setOptsStore] = useState([])
  const commonContext = useContext(CommonContext)
  const { dispatch, sourceStore } = commonContext
  
  useEffect(() => {
    if (props.data.loading) props.preloader.current.show()
    else {
      setTimeout(() => {
        props.preloader.current.hide()
      }, 2000)
    }
    if (props.data.getStores) {
      setOptsStore(props.data.getStores)
    }
  }, [props.data, props.preloader])

  useEffect(() => {
    if (optsStore && optsStore.length) {
      let store = optsStore[0]
      localStorage.setItem('store-selected', store._id)
      dispatch({
        type: 'changeStore',
        payload: {
          _id: store._id,
          code: store.code,
          name: store.name
        }
      })
    }
  }, [optsStore, dispatch])

  const options = useMemo(() => (
    optsStore.map((e) => (
      <Option key={e._id}>{e.name}</Option>
    ))
  ), [optsStore])

  const selectHandle = val => {
    const store = optsStore.find(e => e._id === val)
    localStorage.setItem('store-selected', store._id)
    dispatch({
      type: 'changeStore',
      payload: {
        _id: store._id,
        code: store.code,
        name: store.name
      }
    })
  }

  const handleGoback = () => {
    props.history.goBack()
  }

  return (
    <>
      <Navbar bg='dark' expand='lg'>
        <Navbar.Brand>
          <Button
            onClick={handleGoback}
            icon={<Icon.ChevronsLeft />}
          />
        </Navbar.Brand>
        <Navbar.Brand
          href='/steelApp/home'
          style={{
            color: 'white'
          }}
        >
          Nguyên Phú
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <></>
          </Nav>
          <Form inline>
            <Select
              style={{ width: 300 }}
              placeholder='Chọn cơ sở'
              value={sourceStore._id}
              onSelect={selectHandle}
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
