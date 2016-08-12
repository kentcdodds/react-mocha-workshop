import React from 'react'
import {render, mount} from 'enzyme'
import getStoreStub from '../store/Customers.stub-final'

import CustomerList from './CustomerList'

describe('CustomerList', () => {
  it('should render no customers and add button', () => {
    const wrapper = renderCustomerList()
    expect(wrapper).to.include.text('no customers')
    expect(wrapper).to.not.include.text('list of customers')
  })

  it('should render customers and add button', () => {
    const {store} = getStoreStub([{name: 'Bob'}, {name: 'Joanna'}])
    const wrapper = renderCustomerList({store})
    expect(wrapper).to.include.text('list of customers')
    expect(wrapper).to.include.text('Bob')
    expect(wrapper).to.include.text('Joanna')
    expect(wrapper).to.not.include.text('no customers')
  })

  it('should respond to store updates', () => {
    const {store, ref} = getStoreStub()
    const wrapper = mountCustomerList({store})
    ref.updateCustomers([{name: 'Jill'}, {name: 'Fred'}])
    expect(wrapper).to.include.text('list of customers')
    expect(wrapper).to.include.text('Jill')
    expect(wrapper).to.include.text('Fred')
    expect(wrapper).to.not.include.text('no customers')
  })

  it('should unsubscribe when unmounted with enzyme', () => {
    expect(window).to.be.defined
    expect(document).to.be.defined
    const {ref, store} = getStoreStub()
    const wrapper = mountCustomerList({store})
    wrapper.unmount()
    expect(ref.unsubscribe).to.have.been.calledOnce
  })
})

/**
 * Mount the <CustomerList /> component with enzyme and return the wrapper
 * @param  {Object} props={} - the props to apply to the <CustomerList /> component
 * @return {Wrapper} - the enzyme wrapper
 */
function mountCustomerList(props = {}) {
  return mount(<CustomerList {...getPropsWithDefaults(props)} />)
}

function renderCustomerList(props = {}) {
  return render(<CustomerList {...getPropsWithDefaults(props)} />)
}

/**
 * Get the default props for tests
 * @param  {Object} props={} the props to apply to the <CustomerList /> component
 * @return {Object} store, actions, and the props you've passed (overwriting the store and actions)
 */
function getPropsWithDefaults(props = {}) {
  const {store} = getStoreStub()
  const actions = {addCustomer() {}}
  return {store, actions, ...props}
}
