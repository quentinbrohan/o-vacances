import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
// import { logOut } from 'src/actions/user';
import Button from 'src/components/elements/Button';
import Header from 'src/components/Header';

describe('<Header />', () => {
  describe('when connected', () => {
    it('should render 2 logOut buttons', () => {
      const isAuthenticated = true;

      const wrapper = shallow(<Header isAuthenticated={isAuthenticated} handleLogout={logOut()} />);

      const buttonComponents = wrapper.find(Button);
      expect(buttonComponents).to.have.lengthOf(2);
    });
  });

  describe('when not connected', () => {
    it('should render 4 buttons: 2 logIn, 2 signin', () => {
      const isAuthenticated = false;

      const wrapper = shallow(<Header isAuthenticated={isAuthenticated} handleLogout={logOut()} />);

      const buttonComponents = wrapper.find(Button);
      expect(buttonComponents).to.have.lengthOf(4);
    });
  });
});
