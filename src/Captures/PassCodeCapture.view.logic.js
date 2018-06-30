import React from 'react'
import PassCodeCapture from './PassCodeCapture.view.js'

class PassCodeCaptureLogic extends React.Component {
  captureRef = React.createRef()

  componentDidMount() {
    this.maybeFocus()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocus) {
      this.maybeFocus()
    }
  }

  maybeFocus() {
    if (this.props.isFocus) {
      this.captureRef.current.focus()
    }
  }

  onFocus = event => {
    this.captureRef.current.select()

    if (!this.props.isFocus) {
      this.props.onFocus(event, this.props.id)
    }
  }

  onKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.props.onSubmit()
        break

      case 'Escape':
        this.captureRef.current.blur()
        break

      default:
        break
    }
  }

  render() {
    const { props } = this

    return (
      <PassCodeCapture
        {...props}
        isFirst={props.id === 0}
        innerRef={this.captureRef}
        onBlur={event => props.onBlur(event, props.id)}
        onChange={event => props.onChange(event, props.id)}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}
export default PassCodeCaptureLogic
