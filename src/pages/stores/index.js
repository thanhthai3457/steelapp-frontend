import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Grid from 'components/grid/index.js'
import { graphql } from '@apollo/react-hoc'
import { PlusOutlined } from '@ant-design/icons'
import { GET_STORES } from './gql'
import Modal from './modal'

const StoreShop = props => {
  const [dataStore, setDataStore] = useState([])
  const gridApi = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (props.data.loading) props.preloader.current.show()
    else {
      setTimeout(() => {
        props.preloader.current.hide()
      }, 2000)
    }
    if (props.data.getStores) {
      setDataStore(props.data.getStores)
    }
    return () => {
      props.preloader.current.hide()
    }
  }, [props.data, props.preloader])

  const handleAddClick = useCallback(() => {
    modalRef.current.open()
  }, [])

  const handleEditClick = useCallback((slt) => {
    modalRef.current.open(slt)
  }, [])

  const gridOptions = useMemo(() => ({
    paginationNumberFormatter: function(params) {
      return '[' + params.value.toLocaleString() + ']';
    },
    columnDefs: [
      {
        headerName: 'Mã kho',
        field: 'code'
      },
      {
        headerName: 'Tên kho',
        field: 'name'
      },
      {
        headerName: 'Số điện thoại',
        field: 'mobile'
      },
      {
        headerName: 'Địa chỉ',
        field: 'address'
      }
    ],
    actionDefs: [
      {
        action: 'add',
        type: 'default',
        icon: <PlusOutlined />,
        tooltip: 'Thêm kho mới',
        onClick: handleAddClick
      },
      {
        action: 'update',
        type: 'single',
        tooltip: 'Chỉnh sửa',
        onClick: (selectecRows) => handleEditClick(selectecRows[0])
      },
      {
        action: 'delete',
        type: 'multiple',
        onClick: (selectecRows) => console.log(selectecRows)
      }
    ],
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    floatingFilter: true,
    pagination: true,
    defaultPageSize: 50
  }), [handleAddClick, handleEditClick])

  return (
    <div>
      <div className='steelapp-toolbar'>
        <div className='steelapp-title-component'>Kho / Cửa hàng</div>
      </div>
      <div className='steelapp-content'>
        <Grid
          gridOptions={gridOptions}
          data={dataStore}
          gridApi={gridApi}
        />
      </div>
      <Modal
        ref={modalRef}
      />
    </div>
  )
}

export default graphql(GET_STORES)(StoreShop)