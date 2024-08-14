import React, { useEffect } from 'react';
import useFetch from './../customHooks/useFetch';
import { useTasks } from './../context/TaskContext';
import Telon from './../components/Telon.jsx'

const TaskList = () => {
  const { loading, error } = useFetch('https://localhost:7277/api/TodoItems');
  const { tasks, setShowModal, setModalType, setSelectedTask, setModalAction } = useTasks();

  const handleAddTask = () => {
    setShowModal(true)
    setModalType('Nuevo Item')
    setSelectedTask({})
    setModalAction('addTask')
  };

  const handleUpdateTask = (task) => {
    setShowModal(true)
    setModalType('Edit Item')
    setSelectedTask(task)
    setModalAction('updateTask')
  };

  const handleDeleteTask = (taskId) => {
    setShowModal(true)
    setModalType('Delete Item')
    setSelectedTask(taskId)
    setModalAction('deleteTask')
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <section className="table_container">
      <div id="header">
        <h2>
          Task List
        </h2>
        <button className="new_item" onClick={handleAddTask}>
          Create Task
        </button>
      </div>

      <div className="list">
        <ul>
          {tasks && tasks.map((task, index) => (
            <li className="item" key={index}>
              <div className="data">
                <p className="status">{task.isComplete ? '✅' : '🚫'}</p>
                <span> ~ </span>
                <p className="name">{task.name}</p>
              </div>
              <div className="item_actions">
                <button className="edit" onClick={() => handleUpdateTask(task)}>Update</button>
                <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Telon show={loading} />
    </section>
  )
};

export default TaskList;
