import React from 'react';

import { shallow, mount } from 'enzyme';

import { expect } from 'chai';

import { Link, BrowserRouter as Router } from 'react-router-dom';

import HomeVisitor from 'src/components/HomeVisitor';
import Slideshow from 'src/components/HomeVisitor/Slideshow/Slideshow';
import FeaturesSplit from 'src/components/HomeVisitor/FeaturesSplit/FeaturesSplit';

describe('<HomeVisitor />', () => {
  it('includes slideshow component', () => {
    const wrapper = mount(
      <Router>
        <HomeVisitor />
      </Router>,
    );
    expect(wrapper.find(Slideshow)).to.have.lengthOf(1);
  });
  it('includes FeaturesSplit component', () => {
    const wrapper = shallow(<HomeVisitor />);
    expect(wrapper.find(FeaturesSplit)).to.have.lengthOf(1);
  });
  it('includes signin Button component', () => {
    const wrapper = shallow(<HomeVisitor />);
    const linkComponent = wrapper.find(Link);
    expect(linkComponent.props()).to.have.property('to', '/signin');
  });
});
