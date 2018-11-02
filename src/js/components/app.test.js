import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import MainNav from './navigation/main_nav'
import SearchBar from '../components/search/bar'

Enzyme.configure({ adapter: new Adapter() })

function setup(props) {
  let newProps = Object.assign({},{
    login: jest.fn(),
    logout: jest.fn(),
    updateSearchFilter: jest.fn(),
    findObjects: jest.fn(),
    search: jest.mock(),
    profile: jest.mock()
  }, props)
  return shallow(<App {...newProps} />)
}


describe('App', () => {
  it('should render self and subcomponents', () => {
    const enzymeWrapper = setup()
    expect(enzymeWrapper.find(MainNav).exists()).toBe(true)
    expect(enzymeWrapper.find(SearchBar).exists()).toBe(true)
  })
})
