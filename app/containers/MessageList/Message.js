import React, {PropTypes} from 'react'
import Button from './Button'

export default Message

function Message({text}) {
  return (
    <div>
      {text}
      <Button>Delete</Button>
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
}
