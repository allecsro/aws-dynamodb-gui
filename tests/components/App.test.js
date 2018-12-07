import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'; // Smart components

import App from '../../app/components/App';

const mockStore = configureStore();
const initialState = {}
const store = mockStore(initialState);

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App store={store}/>);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });
});
