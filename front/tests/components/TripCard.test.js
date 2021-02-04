import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'src/components/Card';

describe('<Card />', () => {
  it('Uses information given as props', () => {
    const testTitle = 'Voyage Colombie';
    const id = 1;
    const startDate = '2020-05-24T00:00:00+00:53';
    const endDate = '2020-05-24T00:00:00+00:53';

    const wrapper = shallow(
      <Card
        id={id}
        title={testTitle}
        thumbnail="img1.jpg"
        location="Bogota"
        startDate={startDate}
        endDate={endDate}
      />,
    );

    const elementsH4 = wrapper.find('h4');
    expect(elementsH4).to.have.lengthOf(1);
    expect(elementsH4.text()).to.equal(testTitle);

    const linkComponents = wrapper.find(Link);
    expect(linkComponents).to.have.lengthOf(1);
    expect(linkComponents.props()).to.have.property('to', `/voyage/${id}`);
  });
});
