/**
 * This is used to set up the environment that's needed for most
 * of the unit tests for the project which includes polyfilling,
 * chai setup, and initializing the DOM with jsdom
 */
import 'babel-polyfill'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinonChai from 'sinon-chai'
// import {jsdom} from 'jsdom'
const jsdom = require('jsdom')

chai.use(chaiEnzyme())
chai.use(sinonChai)

global.document = jsdom.jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator
global.expect = chai.expect
