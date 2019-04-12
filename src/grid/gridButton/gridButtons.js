import React, {Fragment} from 'react';

import './gridButtons.scss';

const ActionButton = ({className, cellSize, text = `+`, buttonRef, onClick}) => (
  <button
    className={`action-btn ${className}`}
    style={{height: cellSize, width: cellSize}}
    ref={buttonRef}
    onClick={onClick}
  > {text} </button>
);

const GridButtons = ({cellSize, delButtonColRef, delButtonRowRef, onAddRowClick, onAddColClick, onDelColClick, onDelRowClick}) => (
  <Fragment>
    <ActionButton
      className="add-btn-row"
      cellSize={cellSize}
      onClick={onAddRowClick}/>
    <ActionButton
      className="add-btn-col"
      cellSize={cellSize}
      onClick={onAddColClick}/>
    <ActionButton
      className="del-btn-row"
      cellSize={cellSize}
      text="-"
      buttonRef={delButtonRowRef}
      onClick={onDelRowClick}/>
    <ActionButton
      className="del-btn-col"
      cellSize={cellSize}
      text="-"
      buttonRef={delButtonColRef}
      onClick={onDelColClick}/>
  </Fragment>
);

export default GridButtons;