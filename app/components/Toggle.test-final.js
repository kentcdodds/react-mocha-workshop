import React from 'react'
import {render, mount} from 'enzyme'
import {spy} from 'sinon'

import Toggle from './Toggle'

describe('Toggle', () => {
  it('should have toggle--off class applied by default', () => {
    const wrapper = renderToggle()
    expect(wrapper).to.have.descendants('.toggle--off')
  })

  it('should have toggle--on class applied when initialToggledOn specified to true', () => {
    const wrapper = renderToggle({initialToggledOn: true})
    expect(wrapper).to.have.descendants('.toggle--on')
  })

  it('should invoke the onToggle prop when clicked', () => {
    const onToggle = spy()
    const wrapper = mountToggle({onToggle})
    clickButton(wrapper)

    expect(onToggle).to.have.been.calledOnce
    expect(onToggle).to.have.been.calledWith(true)
  })

  it('should change the class when clicked', () => {
    const wrapper = mountToggle()
    clickButton(wrapper)
    expect(wrapper).to.have.descendants('.toggle--on')
  })
})

function renderToggle(props) {
  return render(<Toggle {...getProps(props)} />)
}

function mountToggle(props) {
  return mount(<Toggle {...getProps(props)} />)
}

function getProps(props = {}) {
  return {
    onToggle() {},
    children: 'Toggle Me',
    ...props,
  }
}

function clickButton(wrapper) {
  wrapper.find('button').first().simulate('click')
}
