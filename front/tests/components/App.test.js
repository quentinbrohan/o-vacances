import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Router, Link } from 'react-router-dom';
import HomeVisitor from 'src/pages/HomeVisitor';
import FeaturesSplit from 'src/pages/HomeVisitor/FeaturesSplit/FeaturesSplit';
import Slideshow from 'src/pages/HomeVisitor/Slideshow/Slideshow';

import { Provider } from 'react-redux';
import { store } from 'src/store';
import { history } from 'src/history';

describe('App', async () => {
  it('renders includes slideshow component', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <HomeVisitor />
        </Router>,
      </Provider>,
    );
    expect(wrapper.find(Slideshow)).to.have.lengthOf(1);
  });
  it('includes FeaturesSplit component', async () => {
    const wrapper = shallow(<HomeVisitor />);
    expect(wrapper.find(FeaturesSplit)).to.have.lengthOf(1);
  });
  it('includes signin Button component', async () => {
    const wrapper = shallow(<HomeVisitor />);
    const linkComponent = wrapper.find(Link);
    expect(linkComponent.props()).to.have.property('to', '/signin');
  });
});
