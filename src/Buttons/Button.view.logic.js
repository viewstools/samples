import Button from './Button.view.js'
import React from 'react'

export default class ButtonLogic extends React.Component {
  state = {
    isActive: false,
  }

  componentWillUnmount() {
    this.willUnmount = true
  }

  onClick = event => {
    this.setState({ isActive: !this.state.isActive }, () => {
      setTimeout(() => {
        if (this.willUnmount) return

        this.setState({ isActive: !this.state.isActive })
      }, 150)
    })

    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    return <Button {...this.state} {...this.props} onClick={this.onClick} />
  }
}
