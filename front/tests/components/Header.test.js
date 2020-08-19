import React from 'react';

import { shallow } from 'enzyme';

import { expect } from 'chai';

import Header from 'src/components/Header';

import Button from 'src/components/elements/Button';

import { logOut } from 'src/actions/user';

describe('<Header />', () => {
  describe('when connected', () => {
    it('show logout buttons', () => {
      const isAuthenticated = true;

      const wrapper = shallow(
        <Header
          isAuthenticated={isAuthenticated}
          handleLougout={logOut()}
        />,
      );

      const buttonComponents = wrapper.find(Button);
      expect(buttonComponents).to.have.lengthOf(2);
    });
  });
});
