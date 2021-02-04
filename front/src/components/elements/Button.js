import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { history } from 'src/index';

const Button = ({
  className,
  type,
  color,
  size,
  loading,
  wide,
  wideMobile,
  tag,
  disabled,
  haveClassName,
  children,
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
    <Component {...props} className={classes} type={type} disabled={disabled}>
      {children}
    </Component>
  );
};

export const BackButton = () => (
  <Button color="secondary" size="small" className="back" onClick={() => history.goBack()}>
    〈{/* 〈 Retour */}
  </Button>
);

Button.propTypes = {
  className: PropTypes.string,
  haveClassName: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.bool,
  wide: PropTypes.bool,
  wideMobile: PropTypes.bool,
  tag: PropTypes.elementType,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Button.defaultProps = {
  className: '',
  haveClassName: '',
  tag: 'button',
  type: 'button',
  color: '',
  size: '',
  loading: false,
  wide: false,
  wideMobile: false,
  disabled: false,
};

export default Button;
