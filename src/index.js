import { join } from 'path'
import React from 'react'
import { mount, shallow } from 'enzyme'
import getDisplayName from 'react-display-name'
import forEach from 'lodash.foreach'
import fakeProps from 'react-fake-props'

const snapshots = (Component, propSets) => {
  let fakePropsOptions
  let isMount

  if (Array.isArray(Component)) {
    Component = join(...Component)
  }

  if (typeof Component === 'object') {
    const options = Component
    Component = options.component
    propSets = options.props
    fakePropsOptions = options.fakePropsOptions
    isMount = options.mount
  }

  if (typeof Component === 'string') {
    Component = Component.match(/[jt]sx?$/) ? Component : `${Component}.js`
  } else {
    propSets = propSets || [{}]
  }

  if (!propSets) {
    const props = fakeProps(Component, fakePropsOptions)
    propSets = {
      'fake props': props
    }
  }

  if (typeof Component === 'string') {
    Component = require(Component)
    Component = Component.default || Component
  }

  const fn = isMount ? mount : shallow

  describe(`${getDisplayName(Component)} snapshots`, () => {
    forEach(propSets, (props, name) => {
      it(`${name}`, () => {
        expect(fn(<Component {...props} />)).toMatchSnapshot()
      })
    })
  })
}

export default snapshots
