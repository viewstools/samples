import React from 'react'
import PassCode from './PassCode.view.js'

export default class PassCodeLogic extends React.Component {
  static defaultProps = {
    length: 6,
  }

  state = {
    from: Array.from(new Array(this.props.length).keys()).map(id => ({
      id,
      isFocus: false,
      value: '',
    })),
  }

  getCode() {
    return this.state.from.map(item => item.value).join('')
  }

  onBlur = (event, id) => {
    this.setState({
      from: this.state.from.map(
        item => (item.id === id ? { ...item, isFocus: false } : item)
      ),
    })
  }

  onChange = (event, id) => {
    const { state } = this
    const nextId = id === state.from.length - 1 ? 0 : id + 1
    const value = event.target.value.charAt(event.target.value.length - 1)
    const shouldFocusNext = value.length === 1

    this.setState(
      {
        from: state.from.map(item => {
          if (item.id === nextId && shouldFocusNext)
            return {
              ...item,
              isFocus: true,
            }

          if (item.id !== id) return item

          return { id, isFocus: !shouldFocusNext, value }
        }),
      },
      this.tellOfChange
    )
  }

  onFocus = (event, id) => {
    this.setState({
      from: this.state.from.map(
        item =>
          item.id === id
            ? { ...item, isFocus: true }
            : item.isFocus
              ? { ...item, isFocus: false }
              : item
      ),
    })
  }

  onSubmit = event => {
    const { props, state } = this
    const maybeNextMissing = state.from.find(item => item.value === '')

    if (maybeNextMissing) {
      this.onFocus(null, maybeNextMissing.id)
      return
    }

    if (!props.onSubmit) return

    props.onSubmit(this.getCode())
  }

  tellOfChange = () => {
    const { props, state } = this
    if (!props.onChange) return

    props.onChange({
      isReady: state.from.every(item => item.value !== ''),
      code: this.getCode(),
    })
  }

  render() {
    return (
      <PassCode
        {...this.state}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onSubmit={this.onSubmit}
      />
    )
  }
}
