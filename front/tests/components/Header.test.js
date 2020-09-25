import React from 'react';

import { shallow } from 'enzyme';

import { expect } from 'chai';

import Header from 'src/components/Header';

import Button from 'src/components/elements/Button';

import { logOut } from 'src/actions/user';

describe('<Header />', () => {
  describe('when connected', () => {
    it('should render 2 logout buttons', () => {
      const isAuthenticated = true;

      const wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          handleLogout={logOut()}
        />,
      );

      const buttonComponents = wrapper.find(Button);
      expect(buttonComponents).to.have.lengthOf(2);
    });
  });

  describe('when not connected', () => {
    it('should render 4 buttons: 2 login, 2 signin', () => {
      const isAuthenticated = false;

      const wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          handleLogout={logOut()}
        />,
      );

      const buttonComponents = wrapper.find(Button);
      expect(buttonComponents).to.have.lengthOf(4);
    });
  });
});
