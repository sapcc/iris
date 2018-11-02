import React from 'react';
import ReactDOM from 'react-dom';
import MainNav from './main_nav';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

function setup(props) {
  return shallow(<MainNav {...props} />)
}

describe('MainNav', () => {
  it('should render self and subcomponents', () => {
    const enzymeWrapper = setup({profile: {}})

    expect(enzymeWrapper.find('nav').hasClass('navbar')).toBe(true)
    expect(enzymeWrapper.find('div.logo').exists()).toBe(true)
    expect(enzymeWrapper.find('a.navbar-brand').text()).toBe('Iris')
    expect(enzymeWrapper.find('span.spinner').exists()).toBe(false)
  })

  it('should render a spinner', () => {
    const enzymeWrapper = setup({profile: {isFetching: true}})
    expect(enzymeWrapper.find('span.spinner').exists()).toBe(true)
  })

  it('should render login link', () => {
    const enzymeWrapper = setup({profile: {user:null}})
    expect(enzymeWrapper.findWhere(n => n.text() == 'Login').exists()).toBe(true)
  })

  it('should render profile link', () => {
    const enzymeWrapper = setup({profile: {user: {name: 'Test'}}})
    expect(enzymeWrapper.findWhere(n => n.text() == 'Profile').exists()).toBe(true)
  })
})
