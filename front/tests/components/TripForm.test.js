import React from 'react';

import { shallow, mount } from 'enzyme';

import { expect } from 'chai';

import TripForm from 'src/components/TripForm';
import Field from 'src/components/TripForm/Field';
import Image from 'src/components/TripForm/Image';

import { addTrip } from 'src/actions/trip';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('<TripForm />', () => {
  it('should render 6 Field inputs', () => {
    const wrapper = mount(
      <TripForm />,
    );

    const fieldComponents = wrapper.find(Field);
    expect(fieldComponents).to.have.lengthOf(6);
  });

  it('should render 1 Image input', () => {
    const wrapper = mount(
      <TripForm />,
    );

    const imageComponent = wrapper.find(Image);
    expect(imageComponent).to.have.lengthOf(1);
  });

  it('should submit form on click', () => {
    const callback = sinon.spy();
    const handleTripForm = sinon.spy();
    const data = {
      title: 'Titre',
      description: 'Une description de voyage',
      startDate: '2020-10-11',
      endDate: '2020-10-21',
      password: 'test',
    };

    const wrapper = mount(
      <TripForm onSubmit={callback} />,
    );

    const formSubmit = wrapper.find('form');
    formSubmit.simulate('submit');
    expect(callback).to.have.been.calledWith(handleTripForm);
    // done();
  });
});
