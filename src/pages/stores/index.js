import React, { useState, useEffect, useMemo, useRef } from 'react'
import Grid from 'components/grid/index.js'
import { graphql } from '@apollo/react-hoc'
import { GET_STORES } from './gql'

const StoreShop = props => {
  const [dataStore, setDataStore] = useState([])
  const gridApi = useRef(null)
  
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

  const gridOptions = useMemo(() => ({
    onGridReady: gridOpts => {
      gridApi.current = gridOpts.api
      gridOpts.api.sizeColumnsToFit()
    },
    paginationNumberFormatter: function(params) {
      return '[' + params.value.toLocaleString() + ']';
    },
    columnDefs: [
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 50,
        sortable: false,
        filter: false
      },
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
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    checkboxSelection: true,
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    onRowClicked: () => console.log(gridApi.current.getSelectedRows()),
    floatingFilter: true,
    pagination: true,
    paginationPageSize: 10
  }), [])

  return (
    <div>
      <div className='steelapp-toolbar'>
        <div className='steelapp-title-component'>Kho / Cửa hàng</div>
      </div>
      <div className='steelapp-content'>
        <Grid
          gridOptions={gridOptions}
          data={dataStore}
        />
      </div>
    </div>
  )
}

export default graphql(GET_STORES)(StoreShop)