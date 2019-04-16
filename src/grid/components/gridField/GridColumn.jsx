import React from 'react';
import './GridColumn.scss';
import PropTypes from 'prop-types';

const GridColumn = ({ cellSize, onColMouseOver, rowIndex, colIndex }) => (
  <div
    className="column"
    style={{ height: cellSize, width: cellSize }}
    onMouseOver={e => onColMouseOver(e, rowIndex, colIndex)}
  />
);

GridColumn.propTypes = {
  cellSize: PropTypes.string,
  onColMouseOver: PropTypes.func,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number
};

export default GridColumn;
