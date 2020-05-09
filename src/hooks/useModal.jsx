import { useState } from 'react'

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)
  const toggle = () => setModalOpen(!modalOpen)
  return { modalOpen, setModalOpen, toggle }
}

export const useModalWithData = () => {
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState({})

  const handleModal = item => {
    if (!modal) {
      item && setSelected(item)
      setModal(true)
    } else {
      setModal(false)
      setSelected({})
    }
  }

  return {
    modal,
    selected,
    setModal,
    setSelected,
    handleModal
  }
}
