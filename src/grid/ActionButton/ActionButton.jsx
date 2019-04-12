import React from 'react';

import './ActionButton.scss';

const ActionButton = ({className, cellSize, text = `+`,style = {} , onClick}) => (
  <button
    className={`action-btn ${className}`}
    style={{height: cellSize, width: cellSize, ...style }}
    onClick={onClick}
  > {text} </button>
);

export default ActionButton;