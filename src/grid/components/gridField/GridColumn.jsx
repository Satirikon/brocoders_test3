import React from 'react';
import './GridColumn.scss';
import PropTypes from 'prop-types';

const GridColumn = ({ cellSize, onColMouseOver, rowIndex, colIndex }) => (
  <div
    className="column"
    style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
    onMouseOver={e => onColMouseOver(e, rowIndex, colIndex)}
  />
);

GridColumn.propTypes = {
  cellSize: PropTypes.number,
  onColMouseOver: PropTypes.func,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number
};

export default GridColumn;
