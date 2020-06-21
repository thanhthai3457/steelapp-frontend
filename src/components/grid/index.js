import React, { useRef, useState, useEffect, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button } from 'antd'
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  PrinterOutlined, RedoOutlined, EyeOutlined
} from '@ant-design/icons'

const Grid = props => {
  const [defaultPageSize, setDefaultPageSize] = useState(1)
  const api = useRef(null)
  const [optionsPage, setOptionsPage] = useState([10, 20, 50, 100])
  const [headerButton, setHeaderButton] = useState([])
  const [selected, setSelected] = useState([])
  const [chose] = useState({
    add: <PlusOutlined />,
    update: <EditOutlined />,
    delete: <DeleteOutlined />,
    print: <PrinterOutlined />,
    reload: <RedoOutlined />,
    info: <EyeOutlined />
  })

  useEffect(() => {
    const all = {...props, ...props.gridOptions}
    if (all.defaultPageSize) {
      if (!optionsPage.includes(all.defaultPageSize)) {
        setOptionsPage(prevOptionsPage => {
          return prevOptionsPage.concat(all.defaultPageSize)
        })
      }
      setDefaultPageSize(all.defaultPageSize)
    }
    if (all.actionDefs && all.actionDefs.length) {
      const { actionDefs } = all
      setHeaderButton(actionDefs.map(actionDef => ({
        ...actionDef,
        icon: actionDef.icon ? actionDef.icon : chose[actionDef.action]
      })))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPageSizeChanged = (val) => {
    setDefaultPageSize(val.target.value)
    api.current.paginationSetPageSize(val.target.value)
  }

  const gridOptions = useMemo(() => {
    const all = {...props, ...props.gridOptions}
    all.hideCheckbox = all.hideCheckbox || false
    all.columnDefs = all.hideCheckbox
      ? all.columnDefs
      : all.columnDefs.unshift({
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 50,
        sortable: false,
        filter: false
      })
    return {
      onGridReady: gridOpts => {
        if (props.gridApi) props.gridApi.current = gridOpts.api
        api.current = gridOpts.api
        gridOpts.api.sizeColumnsToFit()
      },
      ...props.gridOptions,
      onSelectionChanged: () => {
        setSelected(api.current.getSelectedRows())
      },
      onRowClicked: () => {
        const { onRowClicked } = all
        if (typeof onRowClicked === 'function') {
          onRowClicked()
        }
        setSelected(api.current.getSelectedRows())
      },
      paginationPageSize: defaultPageSize
    }
  }, [defaultPageSize, props])

  const actionHeader = useMemo(() => (
    headerButton.map(e => (
      <Button
        icon={e.icon}
        disabled={
          (e.type !== 'default' && (selected.length === 0))
          || (e.type === 'single' && (selected.length === 0 || selected.length > 1))
        }
        className='ag-steelapp-headerbutton'
        onClick={() => typeof e.onClick === 'function' && e.onClick(api.current.getSelectedRows())}
      />
    ))
  ), [headerButton, selected])

  return (
    <div className='ag-grid-app-wrapper'>
      <div className='ag-header-pagination'>
        <div className='left'>
          <span style={{ marginRight: 5 }}>Page size</span>
          <select
            onChange={e => onPageSizeChanged(e)}
            id='page-size'
            value={defaultPageSize}
            style={{ marginRight: 5 }}
          >
            {optionsPage.sort((a, b) => (a - b)).map(e => (
              <option
                key={e}
                value={e}
              >
                {e}
              </option>
            ))}
          </select>
          <span>{selected.length === 0 ? '' : `(${selected.length} ${selected.length > 1 ? 'rows selected' : 'row selected'})`}</span>
        </div>
        <div className='right'>
          {actionHeader}
        </div>
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
          rowData={props.data}
        >
        </AgGridReact>
      </div>
    </div>
  )
}

export default Grid