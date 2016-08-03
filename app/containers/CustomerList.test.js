import React from 'react'
import {spy} from 'sinon'
import {render as domRender, unmountComponentAtNode} from 'react-dom'
import {render, mount} from 'enzyme'

import CustomerList from './CustomerList'

describe('CustomerList', () => {
  it('should render no customers and add button', () => {
    const wrapper = render(<CustomerListWithDefaults />)
    expect(wrapper).to.include.text('no customers')
    expect(wrapper).to.not.include.text('list of customers')
  })

  it('should render customers and add button', () => {
    const {store} = getStoreStub([{name: 'Bob'}, {name: 'Joanna'}])
    const wrapper = render(<CustomerListWithDefaults store={store} />)
    expect(wrapper).to.include.text('list of customers')
    expect(wrapper).to.include.text('Bob')
    expect(wrapper).to.include.text('Joanna')
    expect(wrapper).to.not.include.text('no customers')
  })

  it('should respond to store updates', () => {
    const {store} = getStoreStub([{name: 'Jill'}, {name: 'Fred'}])
    const wrapper = mount(<CustomerListWithDefaults store={store} />)

    expect(wrapper).to.include.text('list of customers')
    expect(wrapper).to.include.text('Jill')
    expect(wrapper).to.include.text('Fred')
    expect(wrapper).to.not.include.text('no customers')
  })

  it('should unsubscribe when unmounted', () => {
    const {ref, store} = getStoreStub()
    const div = renderToDiv({store})
    unmountComponentAtNode(div)
    expect(ref.unsubscribe).to.have.been.calledOnce
  })

  // if you can get this one to work, that's awesome. I'm getting the following error message:
  // Invariant Violation: dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure
  // `window` and `document` are available globally before requiring React when unit testing or use
  // ReactDOMServer.renderToString() for server rendering.
  it.skip('should unsubscribe when unmounted with enzyme', () => {
    expect(window).to.be.defined
    expect(document).to.be.defined
    const {ref, store} = getStoreStub()
    const wrapper = mount(<CustomerListWithDefaults store={store} />)
    wrapper.unmount()
    expect(ref.unsubscribe).to.have.been.calledOnce
  })
})


/**
 * Create a stub for the store which can be used for assertions
 * @param {Array} customers - the array of customers
 * @returns {Object} - ref property has customers and will haf ref.callback when
 *   store.callback is invoked. store.getCustomers will return ref.customers
 */
function getStoreStub(customers = []) {
  const unsubscribe = spy()
  const ref = {customers, unsubscribe}
  const store = {
    getCustomers: () => ref.customers,
    subscribe: cb => {
      ref.callback = cb
      return ref.unsubscribe
    },
  }
  return {ref, store}
}

/**
 * Render the <CustomerList /> component to a div with the given props
 * @param {Object} props - the props to apply to the <CustomerList /> element
 * @returns {Element} - the div that contains the element
 */
function renderToDiv(props) {
  const div = document.createElement('div')
  domRender(
    <CustomerListWithDefaults {...props} />,
    div,
  )
  return div
}

function CustomerListWithDefaults(props) {
  const store = {
    getCustomers: () => [],
  }
  const actions = {
    addCustomer() {},
  }
  const propsToApply = {store, actions, ...props}
  return <CustomerList {...propsToApply} />
}
