import { useState } from 'react'
import Table from './components/Table.jsx'
import Telon from './components/Telon.jsx'
import Modal from './components/Modal.jsx'
import './App.css'

function App() {
  const [showStatus, setShowStatus] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState('')
  
  const handleModal = (id = null, show = false, action = '') => {
    setSelectedItem(id);
    setShowModal(show);
    setModalAction(action)
  }
 
  return (
    <section id="global_container">

      <Table 
        showStatus={showStatus}  
        setShowStatus={setShowStatus}  
        selectedItem={selectedItem}  
        setSelectedItem={setSelectedItem}  
        showModal={showModal}  
        setShowModal={setShowModal}  
        modalAction={modalAction}  
        setModalAction={setModalAction} 
        handleModal={handleModal} 
      />
      
      <Modal id={selectedItem} show={showModal} action={modalAction} handleModal={handleModal}  />
      <Telon show={showStatus} />

    </section>
  )
}

export default App
