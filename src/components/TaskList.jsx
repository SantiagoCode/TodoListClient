import React from 'react';
import useFetch from './../customHooks/useFetch';
import { useTasks } from './../context/TaskContext';

const TaskList = () => {
  const { loading, error } = useFetch('https://localhost:7277/api/TodoItems');
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const handleAddTask = () => {
    const newTask = { name: 'New Task', completed: false };
    addTask(newTask);
  };

  const handleUpdateTask = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <section className="table_container">
      <div id="header">
        <h2>
          Listado de Actividades
        </h2>
        <button className="new_item" onClick={handleAddTask}>
          Nueva Tarea
        </button>
      </div>

      <div className="list">
        <ul>
          {tasks && tasks.map((task, index) => (
            <li className="item" key={index}>
              <div className="data">
                <p className="id">{task.id}</p>
                <p className="name">{task.name}</p>
              </div>
              <div className="item_actions">
                <button className="edit" onClick={() => handleUpdateTask(task)}>Editar</button>
                <button className="delete" onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
};

export default TaskList;
