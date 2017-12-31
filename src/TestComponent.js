import React from 'react'
import PropTypes from 'prop-types'

const TestComponent = ({ one, two }) => <div>hello, {one}, {two}</div>

TestComponent.propTypes = {
  one: PropTypes.string.isRequired,
  two: PropTypes.string
}

export default TestComponent
