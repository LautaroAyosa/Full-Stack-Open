import React, { useState } from 'react'
import propTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
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
})

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}

export default Togglable
