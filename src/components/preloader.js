import React, { forwardRef, useState, useImperativeHandle, useCallback } from 'react'
import { Spinner } from 'react-bootstrap'

const style = {
  position: 'fixed',
  top: '45%',
  left: '50%'
}

const Preloader = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  return (
    visible
      ? <Spinner
          animation='border'
          style={style}
        />
      : <></>
  )
})

export default Preloader
