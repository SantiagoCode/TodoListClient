import { useState } from "react"
import { useTasks } from './../context/TaskContext';
import Button from './Button'

const New = ({ handle }) => {
  const [taskName, setTaskName] = useState('')

  return (
    <div className="modal_content">
      <label htmlFor="name">Task Name: <input id="name" type="text" onChange={(e) => setTaskName(e.target.value)}/></label>

      <button disabled={taskName.length < 4} onClick={() => handle({
        id: 0, name: taskName, isComplete: false
      })}>Save</button>
    </div>
  )
}

const Edit = ({ handle, task }) => {
  const [newTaskName, setNewTaskName] = useState(task.name)
  const [newTaskStatus, setNewTaskStatus] = useState(task.isComplete)

  const handleEditTask = () => {
    const data = task
    data.name = newTaskName
    data.isComplete = newTaskStatus

    handle(data)
  }

  return (
    <div className="modal_content">
      <label htmlFor="name">
        Task Name: 
        <input id="name" type="text" defaultValue={task.name} onChange={(e) => setNewTaskName(e.target.value)}/>
      </label>
      <label className="label_check" htmlFor="status">
        <input id="status" type="checkbox" defaultChecked={task.isComplete} onChange={(e) => setNewTaskStatus(e.target.checked)}/>
        Task Status: 
      </label>

      <button disabled={task.name == newTaskName && task.isComplete == newTaskStatus} onClick={() => handleEditTask()}>Update</button>
    </div>
  )
}

const Delete = ({ handle, taskId }) => {
  
  return (
    <>
      <h3>Are you sure you want to delete this task?</h3>
      <button onClick={() => handle(taskId)}>Delete</button>
    </>
  )
}

const Modal = () => {
  const { modalType, selectedTask, handleFetch, modalAction, handleCloseModal } = useTasks();

  const generalMethod = (param) => {
    handleFetch[modalAction](param)
    handleCloseModal()
  }

  return (
    <section id="modal">
      <div className="modal_container">
    
        <Button id='go_back_btn' classes="go_back" callback={handleCloseModal}>
          <img src="/img/go_back.svg" className="go_back_img" alt="Go Back" />
        </Button>
        
        <div className="modal_header">
          <h2 style={{ margin: 0 }}>{modalType}</h2>
        </div>

        {modalType == 'Nuevo Item' && <New handle={generalMethod} />}
        {modalType == 'Edit Item' && <Edit handle={generalMethod} task={selectedTask}/>}
        {modalType == 'Delete Item' && <Delete handle={generalMethod} taskId={selectedTask}/>}
      </div>
    </section>
  )
}

export default Modal