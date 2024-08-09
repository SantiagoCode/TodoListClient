const ButtonClose = ({ handle }) => {
  return (
    <button className="go_back" onClick={() => handle()}>{'<'}</button>
  )
}

const New = () => {
  return (
    <p>New</p>
  )
}

const Edit = () => {
  return (
    <p>Edit</p>
  )
}

const Delete = () => {
  return (
    <>
      <p>Seguro desea eliminar este registro?</p>
      <div className="buttons-delete">
        <button className="cancel">Cancelar</button>
        <button className="delete">Eliminar</button>
      </div>
    </>
  )
}

const Modal = ({id, show, action, handleModal}) => {

  return (
    <>
      {show == true && (
        <section id="modal">
          <div className="modal_content">
            <ButtonClose handle={() => handleModal()}/>
            <div className="modal_header">
              <h2>{action}</h2>
            </div>

            {action == 'Nuevo Item' && <New></New>}
            {action == 'Editar Item' && <Edit></Edit>}
            {action == 'Eliminar Item' && <Delete></Delete>}
          </div>
        </section>)
      }
    </>
  )
}

export default Modal