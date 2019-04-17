import React from 'react';
import GridRow from './GridRow';
import './GridFields.scss';
import PropTypes from 'prop-types';

const GridFields = ({
  cellSize,
  onColMouseOver,
  onGridMouseLeave,
  rows,
  columns
}) => (
  <div className="grid-root" onMouseLeave={onGridMouseLeave}>
    {rows.map((value, index) => {
      return (
        <GridRow
          key={value}
          columns={columns}
          cellSize={cellSize}
          rowIndex={index}
          onColMouseOver={onColMouseOver}
        />
      );
    })}
  </div>
);

GridFields.propTypes = {
  cellSize: PropTypes.number,
  onColMouseOver: PropTypes.func,
  onGridMouseLeave: PropTypes.func,
  rows: PropTypes.array,
  columns: PropTypes.array
};

export default GridFields;
