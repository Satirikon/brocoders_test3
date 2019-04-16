import React from 'react';
import GridColumn from './GridColumn';
import './GridRow.scss';
import PropTypes from 'prop-types';

const GridRow = ({ columns, cellSize, onColMouseOver, rowIndex }) => (
  <div className="row">
    {columns.map((value, index) => {
      return (
        <GridColumn
          key={value}
          cellSize={cellSize}
          rowIndex={rowIndex}
          colIndex={index}
          onColMouseOver={onColMouseOver}
        />
      );
    })}
  </div>
);

GridRow.propTypes = {
  columns: PropTypes.array,
  cellSize: PropTypes.string,
  onColMouseOver: PropTypes.func,
  rowIndex: PropTypes.number
};

export default GridRow;
