import UsePassCode from './UsePassCode.view.js'
import React from 'react'

export default class UsePassCodeLogic extends React.Component {
  state = {
    code: null,
    isReady: false,
  }

  render() {
    return (
      <UsePassCode
        {...this.state}
        onChange={({ code, isReady }) => {
          this.setState({ code, isReady })
        }}
        onSubmit={code => this.setState({ code, isReady: true })}
      />
    )
  }
}
