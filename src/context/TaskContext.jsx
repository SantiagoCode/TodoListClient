import React, { createContext, useContext, useState } from 'react';
import Modal from './../components/Modal'

const TaskContext = createContext();
const URL = 'https://localhost:7277/api/TodoItems'

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedTask, setSelectedTask] = useState({})
  const [modalAction, setModalAction] = useState(() => {})

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType('')
    setSelectedTask({})
    setModalAction(() => {})
  }

  const handleFetch = {
    fetchTasks: async (endpoint) => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    addTask: async (newTask) => {
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
        const data = await response.json();
        setTasks((prevTasks) => [...prevTasks, data]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    updateTask: async (updatedTask) => {
      try {
        const response = await fetch(`${URL}/${updatedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        const data = await response
        
        if(data.ok && data.status == 204) handleFetch.fetchTasks(URL)
        
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    deleteTask: async (taskId) => {
      try {
        await fetch(`${URL}/${taskId}`, {
          method: 'DELETE',
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  }

  return (
    <TaskContext.Provider value={{ tasks, handleFetch, setShowModal, modalType, setModalType, selectedTask, setSelectedTask, modalAction, setModalAction, handleCloseModal }}>
      {children}
      {showModal && <Modal />}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
