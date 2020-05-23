import gql from 'graphql-tag'
import { Client } from '@tools'
import React from 'react'

const reducer = (prevState, state) => ({
  ...prevState,
  ...state
})

const queryData = async (inputQuery, variables = {}, hasGql = true, fetchPolicy = 'network-only') => {
  const query = hasGql ? inputQuery : gql`${inputQuery}`
  const data = await Client.query({
    query,
    variables,
    fetchPolicy
  })
  return data
}

const mutateData = async (inputQuery, variables = {}, hasGql = true) => {
  const mutation = hasGql ? inputQuery : gql`${inputQuery}`
  const data = await Client.mutate({
    mutation,
    variables
  })
  return data
}

const renderColumn = (Component, props = {}) => () => {
  return <Component {...props} />
}

const patternRule = {
  preSpace: (mess) => ({
    pattern: /^[^\s]/,
    message: mess || 'Không được có dấu cách đầu dòng'
  }),
  required: (mess) => ({
    required: true,
    message: mess || 'Không được để trống!'
  }),
  notBracket: (mess) => ({
    pattern: /^[^()]+$/,
    message: mess || 'Vui lòng không sử dụng dấu đóng mở ngoặc tròn'
  })
}

const checkDoubleClickFunc = async (varCheckRef, callback) => {
  if (typeof varCheckRef.current !== 'boolean') {
    console.error('checkDoubleClick isnt boolean')
    return
  }
  if (varCheckRef.current === true) {
    return
  }
  // eslint-disable-next-line
  varCheckRef.current = true
  await callback()
  // eslint-disable-next-line
  varCheckRef.current = false
}

const checkDoubleClickByCurriedFunc = (varCheckRef, callback) => async () => {
  if (typeof varCheckRef.current !== 'boolean') {
    console.error('checkDoubleClick isnt boolean')
    return
  }
  if (varCheckRef.current === true) {
    return
  }
  // eslint-disable-next-line
  varCheckRef.current = true
  await callback()
  // eslint-disable-next-line
  varCheckRef.current = false
}

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  // var seconds = ((millis % 60000) / 1000).toFixed(0)
  // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
  return minutes
}

const objEnumState = {
  processing: 0,
  approved: 99,
  hasCancel: 100,
  0: 'processing',
  99: 'approved',
  100: 'hasCancel'
}

const objGender = {
  female: 'Nữ',
  male: 'Nam',
  other: 'Khác'
}

const tagStyle = { width: 150, display: 'flex', justifyContent: 'center' }

const renderState = (val) => {
  if (val === 0) {
    return 'Đang chờ'
  }
  if (val === 99) {
    return 'Đã tiếp nhận'
  }
  return 'Đã hủy'
}

// const DocumentStatusComp = val => {
//   let color
//   switch (val) {
//     case 0:
//       color = '#137300'
//       break
//     case 99:
//       color = '#108EE9'
//       break
//     case 100:
//       color = '#F50'
//       break
//     default:
//       color = '#BFBFBF'
//   }
//   return (
//     <Tag style={tagStyle} color={color}>
//       {renderState(val)}
//     </Tag>
//   )
// }

// const DocumentStatus = (val, objState) => {
//   let color
//   switch (val) {
//     case 'RECEIVED':
//       color = '#678BC7'
//       break
//     case 'CHECKING_UP':
//       color = '#1A9898'
//       break
//     case 'COMPLETED':
//       color = '#0092D1'
//       break
//     case 'CANCELED':
//       color = '#F50'
//       break
//     default:
//       color = '#BFBFBF'
//   }
//   return (
//     <Tag style={tagStyle} color={color}>
//       {objState.current[val]}
//     </Tag>
//   )
// }

const filterOptsDefault = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

const FormatNumber = (varValue, decimalLength) => {
  const value = !varValue ? '0' : varValue
  let tmp = typeof value === 'string' ? value : value.toString()
  tmp = tmp.replace(/\$\s?|(,*)/g, '')

  if (tmp.indexOf('.') !== -1) {
    tmp = Number(tmp).toFixed(decimalLength !== undefined ? decimalLength : 2)
    const num1 = tmp.split('.')[0]
    const num2 = tmp.split('.')[1].slice(0, decimalLength !== undefined ? decimalLength : 2)
    return `${num1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${Number(`0.${num2}`) !== 0 ? `.` : ``}${`${Number(`0.${num2}`)}`.slice(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }
  return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const arrClassify = [
  {
    name: 'Loại I',
    value: 'I'
  },
  {
    name: 'Loại II',
    value: 'II'
  },
  {
    name: 'Loại III',
    value: 'III'
  },
  {
    name: 'Loại IV',
    value: 'IV'
  },
  {
    name: 'Loại V',
    value: 'V'
  }
]

const transformRCFormErrors = (errorsObj, listErrors = []) => {
  if (errorsObj) {
    Object.values(errorsObj).forEach(v => {
      if (Array.isArray(v)) listErrors.push(...v.flat().filter(Boolean))
      else if (typeof v === 'object') transformRCFormErrors(v, listErrors)
    })
  }
  return [...new Set(listErrors)]
}

const convertObjToObjDot = (obj, target = null, prefix = '') => {
  // eslint-disable-next-line
  target = target || {}
  // eslint-disable-next-line
  prefix = prefix || ""
  // eslint-disable-next-line
  Object.keys(obj).forEach(key => {
  // eslint-disable-next-line
    if (!(typeof obj[key] === 'object' && obj[key] && !Array.isArray(obj[key]))) return (target[prefix + key] = obj[key])
  // eslint-disable-next-line
    convertObjToObjDot(obj[key], target, prefix + key + '.')
  })

  return target
}

const convertObjDotToObj = (obj) => {
  const res = {}
  let t
  let parts
  let part
  Object.keys(obj).forEach(k => {
    t = res
    parts = k.split('.')
    const key = parts.pop()
    while (parts.length) {
      part = parts.shift()
      // eslint-disable-next-line
      t = t[part] = t[part] || {}
    }
    t[key] = obj[k]
  })
  return res
}

export {
  reducer,
  queryData,
  mutateData,
  renderColumn,
  patternRule,
  checkDoubleClickFunc,
  millisToMinutesAndSeconds,
  objEnumState,
  objGender,
  DocumentStatusComp,
  checkDoubleClickByCurriedFunc,
  filterOptsDefault,
  FormatNumber,
  DocumentStatus,
  arrClassify,
  transformRCFormErrors,
  convertObjToObjDot,
  convertObjDotToObj
}
