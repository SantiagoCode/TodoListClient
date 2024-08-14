const Button = ({ id, classes, callback, children }) => {

  return (
    <button id={id} className={classes} onClick={callback}>
      {children}
    </button>
  )
}

export default Button