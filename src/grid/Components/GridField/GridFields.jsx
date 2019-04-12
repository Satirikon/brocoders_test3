import React from 'react';

import './GridFields.scss';

const GridColumn = ({cellSize, onColMouseOver, rowIndex, colIndex}) => (
  <div
    className="column"
    style={{height: cellSize, width: cellSize}}
    onMouseOver={(e) => onColMouseOver(e, rowIndex, colIndex)}/>
);

const GridRow = ({columns, cellSize, onColMouseOver, rowIndex}) => (
  <div className="row">
    {columns.map((value, index) => {
      return <GridColumn
        key={value}
        cellSize={cellSize}
        rowIndex={rowIndex}
        colIndex={index}
        onColMouseOver={onColMouseOver}
      />
    })}
  </div>
);

const GridFields = ({cellSize, onColMouseOver, onGridMouseLeave, rows, columns}) => (
  <div className="grid-root" onMouseLeave={onGridMouseLeave}>
    {rows.map((value, index) => {
      return <GridRow
        key={value}
        columns={columns}
        cellSize={cellSize}
        rowIndex={index}
        onColMouseOver={onColMouseOver}
      />
    })}
  </div>
);


export default GridFields;