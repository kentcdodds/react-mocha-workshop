import React, {PropTypes} from 'react'
import Message from './Message'

class MessageList extends React.Component {
  getChildContext() {
    return {color: 'purple'}
  }

  render() {
    const {messages} = this.props
    const children = messages.map(message =>
      <Message key={message.id} text={message.text} />
    )
    return <div>{children}</div>
  }
}

MessageList.childContextTypes = {
  color: React.PropTypes.string,
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }))
}
