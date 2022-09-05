import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className={props.className}>
      <div style={hideWhenVisible} className={props.showDivClassName}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className={props.contentDivClassName}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideLabel ? props.hideLabel : 'cancel'}</button>
      </div>
    </div>
  )
}

export default Togglable