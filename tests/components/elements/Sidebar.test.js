import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import SideBar from '../../../app/components/elements/sidebar';
import App from "../../../app/components/App";

describe('<SideBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = wrapper = shallow(<SideBar />);
  });

  describe('render()', () => {
    test('renders the component', () => {
      expect(wrapper.find('.menu').type()).toEqual('ul');
    });
  });
});
