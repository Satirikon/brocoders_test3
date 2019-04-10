import React, {Fragment} from 'react';
import './gridButton.scss';

const GridButtons = ({
                       cellSize,
                       delButtonColRef,
                       delButtonRowRef,
                       onAddRowClick,
                       onAddColClick,
                       onDelColClick,
                       onDelRowClick
}) => {


  return (
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
  )
};

const ActionButton = ({className, cellSize, text = `+`, buttonRef, onClick}) => {
  return <button
    className={`action-btn ${className}`}
    style={{height: cellSize, width: cellSize}}
    ref={buttonRef}
    onClick={onClick}
  >{text}</button>
};

export default GridButtons;