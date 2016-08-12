import {spy} from 'sinon'
export default getStoreStub

/**
 * Create a stub for the store which can be used for assertions
 * @param {Array} customers - the array of customers
 * @returns {Object} - ref property has customers and will haf ref.callback when
 *   store.callback is invoked. store.getCustomers will return ref.customers
 */
function getStoreStub(customers = []) {
  const unsubscribe = spy()
  const ref = {customers, unsubscribe, updateCustomers}

  const store = {
    getCustomers: () => ref.customers,
    subscribe: cb => {
      ref.callback = cb
      return ref.unsubscribe
    },
  }
  return {ref, store}

  function updateCustomers(newCustomers) {
    ref.customers = newCustomers
    ref.callback()
  }
}
