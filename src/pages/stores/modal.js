import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import { Modal } from 'antd'

const ModalForm = React.memo(forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})

  const openModal = useCallback((val) => {
    if (val && val._id) setSelectedRow(val)
    setVisible(true)
  }, [setSelectedRow])

  const closeModal = useCallback(() => {
    setVisible(false)
  }, [])

  const handleOk = useCallback(() => {
    console.log('ok')
  }, [])

  useImperativeHandle(ref, () => (
    {
      open: openModal,
      close: closeModal
    }
  ))

  return (
    <Modal
      visible={visible}
      title={selectedRow._id ? selectedRow.name : 'Thêm kho mới'}
      centered
      onCancel={closeModal}
      onOk={handleOk}
    />
  )
}))

export default ModalForm