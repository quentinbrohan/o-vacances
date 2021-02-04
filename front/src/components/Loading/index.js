import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as LoadingAnimation } from 'src/assets/svg/loading.svg';
import './loading.scss';

const Loading = ({ small }) => (
  <div className={`loading-container ${small && 'small'}`}>
    <LoadingAnimation className={`loading ${small && 'small'}`} />
  </div>
);

export default Loading;

Loading.propTypes = {
  small: PropTypes.bool,
};

Loading.defaultProps = {
  small: false,
};
