import React from 'react';
import PropTypes from 'prop-types';
import './ActionButton.scss';

const ActionButton = ({
  className,
  cellSize,
  text = `+`,
  style = {},
  ...props
}) => (
  <button
    className={`action-btn ${className}`}
    style={{ height: `${cellSize}px`, width: `${cellSize}px`, ...style }}
    {...props}
  >
    {' '}
    {text}{' '}
  </button>
);

ActionButton.propTypes = {
  className: PropTypes.string,
  cellSize: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string
  }),
  props: PropTypes.shape({
    onClick: PropTypes.func,
    onDelBtnMouseEnter: PropTypes.func,
    onDelBtnMouseLeave: PropTypes.func
  })
};

export default React.memo(ActionButton);
