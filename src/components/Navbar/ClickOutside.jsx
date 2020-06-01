import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClickOutside extends Component {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.getContainer = this.getContainer.bind(this)
  }

  getContainer(ref) {
    this.container = ref
  }

  render() {
    const { children, onClickOutside, ...props } = this.props
    return <div {...props} ref={this.getContainer}>{children}</div>
  }

  componentDidMount() {
    document.addEventListener('touched', this.handle, true)
    document.addEventListener('mouseover', this.handle, true)
  }

  componentWillUnmount() {
    document.addEventListener('touched', this.handle, true)
    document.removeEventListener('mouseover', this.handle, true)
  }

  handle = e => {
    if(e.type === 'touched') this.isTouch = true;
    if (e.type === 'mouseover' && this.isTouch) return
    const { onClickOutside } = this.props
    const el = this.container
    if (el && !el.contains(e.target)) onClickOutside(e)
  }
}