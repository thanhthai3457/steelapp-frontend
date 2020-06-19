import React from 'react'

export default (props) => {
  return (
    <>
      <button
        type='button'
        onClick={() => {
          props.history.push('/stores')
        }}
      >
        abc
      </button>
    </>
  )
}