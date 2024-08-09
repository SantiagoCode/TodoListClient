import { useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const apiData = fetchData('https://localhost:7277/api/TodoItems');

const Table = ({
    showStatus, 
    setShowStatus,
    selectedItem, 
    setSelectedItem,
    showModal, 
    setShowModal,
    modalAction, 
    setModalAction,
    handleModal
  }) => {

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
    }, 500)
  }, []);

  const data = apiData.read();

  return (
    <section className="table_container">
      <div id="header">
        <h2>
          Listado de Actividades
        </h2>
        <button className="new_item" onClick={() => handleModal(null, true, 'Nuevo Item')}>
          Nueva Tarea
        </button>
      </div>

      <div className="list">
        <ul>
          {data.map((item, index) => (
            <li className="item" key={index}>
              <div className="data">
                <p className="id">{item.id}</p>
                <p className="name">{item.name}</p>
              </div>
              <div className="item_actions">
                <button className="edit" onClick={() => handleModal(item.id, true, 'Editar Item')}>Editar</button>
                <button className="delete" onClick={() => handleModal(item.id, true, 'Eliminar Item')}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Table;