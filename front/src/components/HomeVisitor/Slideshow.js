/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'react-feather';

import slideshowData from 'src/data/homeVisitorData';
import './homeVisitor.scss';

const Slideshow = () => {
  // console.log(slideshowData);
  // Duration in ms for each slide
  const time = 7000;
  const [index, set] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => set((index + 1) % 2), time);
    return () => clearInterval(interval);
  }, [index]);

  const ref = useRef();
  // useEffect(() => {
  //   ref.current.style.animation = 'none';
  //   void ref.current.offsetHeight;
  //   ref.current.style.animation = `changewidth ${time / 1000}s linear`;
  // }, [index]);

  return (
    <>
      {/* Slideshow Images/Text */}
      <div className="slideshow">
        <div className="slideshow-images">
          {slideshowData.map(({ image }, i) => (
            <div
              key={i}
              hidden={i !== index || undefined}
              style={{ backgroundImage: `url('${image}')` }}
              className="slideshow-image"
              alt="Voyage"
            />
          ))}
        </div>
        <div className="slideshow-content">
          <p className="intro-title">Plannifer vos vacances{' '}
            {slideshowData.map(({ name }, i) => (
              <span
                key={i}
                hidden={i !== index || undefined}
                className="trip-type"
              >
                {name}
              </span>

            ))}
            {' '}
            devient facile.
          </p>
          <p className="intro-content">Partir seul ou à plusieurs, gérer ses activités, échanger entre amis avec O'Vacances. <br />
            Tomber amoureux du voyage à nouveau.
          </p>
        </div>
      </div>

      <a
        className="show-features"
        href="#features-split"
      >
        Voir les fonctionnalités <ArrowDownCircle />
      </a>
    </>
  );
};

export default Slideshow;
