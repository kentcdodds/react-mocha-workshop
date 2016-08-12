import React from 'react'
import {shallow} from 'enzyme'
import Button from './Button'

describe('Button', () => {
  it('should style the button with a background of the context color', () => {
    const color = 'green'
    const wrapper = shallow(<Button>Hi</Button>, {
      context: {color}
    })
    const button = wrapper.find('button')
    expect(button).to.have.style('background', color)
  })
})
