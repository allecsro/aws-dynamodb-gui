import React from 'react';
import { shallow } from 'enzyme';

import App from '../../app/components/App';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });
});
