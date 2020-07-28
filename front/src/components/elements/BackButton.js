import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';

const BackButton = ({
  className,
  color,
  size,
  tag,
  haveClassName,
  link,
  ...props
}) => {
  const classes = classNames(
    'button',
    'back-button',
    color && `button-${color}`,
    size && `button-${size}`,
    haveClassName && `${haveClassName}`,
    className,
  );

  const Component = tag;
  return (
    <Component
      {...props}
      className={classes}
    >
      <Link to={link}>
        <ChevronLeft />
      </Link>
    </Component>
  );
};

BackButton.propTypes = {
  className: PropTypes.string,
  haveClassName: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  tag: PropTypes.elementType,
  link: PropTypes.string.isRequired,
};

BackButton.defaultProps = {
  className: '',
  haveClassName: '',
  tag: 'button',
  color: '',
  size: '',
};

export default BackButton;
