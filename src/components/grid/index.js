import React from 'react'
import { AgGridReact } from 'ag-grid-react'

const Grid = props => {
  const {
    gridOptions,
    data
  } = props

  const onPageSizeChanged = () => {
    console.log('a')
  }

  return (
    <div className='ag-grid-app-wrapper'>
      <div className='ag-header-pagination'>
        Page Size
        <select
          onChange={() => onPageSizeChanged()}
          id='page-size'
        >
          <option value='10' selected=''>
            10
          </option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
      <div
        className='ag-theme-alpine'
        style={{
          // height: '300px',
          height: 'calc(100% - 45px)'
        }}
      >
        <AgGridReact
          {...gridOptions}
          rowData={data}
        >
        </AgGridReact>
      </div>
    </div>
  )
}

export default Grid