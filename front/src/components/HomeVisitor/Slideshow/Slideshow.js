/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'react-feather';
import Button from 'src/components/elements/Button';

import slideshowData from 'src/data/homeVisitorData';
import './slideshow.scss';

const Slideshow = () => {
  // console.log(slideshowData);
  // Duration in ms for each slide
  const time = 7000;
  const [index, setIndex] = useState(0);

  // setIndex + reset Index onClick if on last type
  const changeType = () => {
    setIndex(index + 1);
    if (index === (slideshowData.length - 1)) {
      setIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => changeType(), time);
    return () => clearInterval(interval);
  }, [index]);

  const ref = useRef();
  useEffect(() => {
    ref.current.style.animation = 'none';
    // eslint-disable-next-line no-void
    void ref.current.offsetHeight;
    ref.current.style.animation = `changewidth ${time / 1000}s linear`;
  }, [index]);

  return (
    <>
      {/* Slideshow Images/Text */}
      <section className="slideshow">
        <div className="slideshow-images">
          {slideshowData.map(({ image }, i) => (
            <div
              key={i}
              hidden={i !== index || undefined}
              style={{ backgroundImage: `url('${image}')` }}
              className="slideshow-image transition horizontal"
              alt="Voyage"
            />
          ))}
        </div>
        <div className="slideshow-content">
          <h1 className="intro-title">Planifier vos vacances{' '}
            <a href="#" onClick={() => changeType()}>
              <div
                ref={ref}
                className="progress"
              />
              {slideshowData.map(({ name }, i) => (
                <span
                  key={i}
                  hidden={i !== index || undefined}
                  className="trip-type transition vertical"
                >
                  {name}
                </span>

              ))}
            </a>
            {' '}
          </h1>
          <h1 className="intro-title">
            devient facile.
          </h1>
          <p className="intro-content">Partir seul ou à plusieurs, gérer ses activités, échanger entre amis avec O'Vacances. <br />
            Tomber amoureux du voyage à nouveau.
          </p>
        </div>
      </section>

      <Button color="secondary" size="sm" haveClassName="show-features">
        <a
          href="#fonctionnalites"
        >
          <ArrowDownCircle />
        </a>

      </Button>
    </>
  );
};

export default Slideshow;
