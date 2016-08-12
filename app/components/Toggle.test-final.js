import React from 'react'
import {render, mount} from 'enzyme'
import {spy} from 'sinon'

import Toggle from './Toggle'

describe('Toggle', () => {
  it('toggle--off class applied by default', () => {
    const wrapper = render(<Toggle />)
    expect(wrapper).to.have.descendants('.toggle--off')
  })

  it('toggle--on class applied when initialToggledOn specified to true', () => {
    const wrapper = render(<Toggle initialToggledOn={true} />)
    expect(wrapper).to.have.descendants('.toggle--on')
  })

  it('invokes the onToggle prop when clicked', () => {
    const onToggle = spy()
    const wrapper = mount(<Toggle onToggle={onToggle} />)
    const button = wrapper.find('button').first()
    button.simulate('click')

    expect(wrapper).to.have.descendants('.toggle--on')
    expect(onToggle).to.have.been.calledOnce
    expect(onToggle.calledWith(true)).to.be.true
  })
})
