import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  className,
  color,
  size,
  loading,
  wide,
  wideMobile,
  tag,
  disabled,
  haveClassName,
  ...props
}) => {
  const classes = classNames(
    'button',
    color && `button-${color}`,
    size && `button-${size}`,
    loading && 'is-loading',
    wide && 'button-block',
    wideMobile && 'button-wide-mobile',
    haveClassName && `${haveClassName}`,
    className,
  );

  const Component = tag;
  return (
    <Component
      {...props}
      className={classes}
      disabled={disabled}
    />
  );
};

Button.propTypes = {
  className: PropTypes.string,
  haveClassName: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.bool,
  wide: PropTypes.bool,
  wideMobile: PropTypes.bool,
  tag: PropTypes.elementType,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  haveClassName: '',
  tag: 'button',
  color: '',
  size: '',
  loading: false,
  wide: false,
  wideMobile: false,
  disabled: false,
};

export default Button;
