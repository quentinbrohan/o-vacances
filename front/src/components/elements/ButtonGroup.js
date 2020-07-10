import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ButtonGroup = ({
  className,
  ...props
}) => {
  const classes = classNames(
    'button-group',
    className,
  );

  return (
    <div
      {...props}
      className={classes}
    />
  );
};

ButtonGroup.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ButtonGroup;
