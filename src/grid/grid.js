import React, {Component, createRef } from 'react';
import GridFields from './gridField/gridFields';
import GridButtons from './gridButton/gridButtons';

import './grid.scss';

class Grid extends Component {
  static delButtonRowRef = createRef();
  static delButtonColRef = createRef();

  state = {
    rows: [],
    columns: [],
    activeIndexes: [0, 0]
  };

  constructor(props) {
    super(props);

    this.state.rows = [...Array(props.initialHeight)];
    this.state.columns = [...Array(props.initialWidth)];

    this.hideDelButtons = this.hideDelButtons.bind(this);
    this.onColMouseOver = this.onColMouseOver.bind(this);
    this.onGridMouseLeave = this.onGridMouseLeave.bind(this);
    this.onAddRowClick = this.onAddRowClick.bind(this);
    this.onAddColClick = this.onAddColClick.bind(this);
    this.onDelColClick = this.onDelColClick.bind(this);
    this.onDelRowClick = this.onDelRowClick.bind(this);
  }

  hideDelButtons = () => Grid.delButtonColRef.current.style.display = Grid.delButtonRowRef.current.style.display = 'none';

  onColMouseOver = (e, rowIndex, colIndex) => {
    const currentColumn = e.target;
    const {rows, columns} = this.state;

    if (columns.length > 1) {
      const {style} = Grid.delButtonColRef.current;
      style.left = `${currentColumn.offsetLeft}px`;
      style.display = 'inline';
    }

    if (rows.length > 1) {
      const {style} = Grid.delButtonRowRef.current;
      style.top = `${currentColumn.offsetTop}px`;
      style.display = 'inline';
    }

    this.setState({activeIndexes: [rowIndex, colIndex]});
  };

  onGridMouseLeave = () => {
    setTimeout(() => {
      if (!Grid.delButtonColRef.current.matches(':hover') && !Grid.delButtonRowRef.current.matches(':hover')) {
        this.hideDelButtons();
      }
    }, 200);
  };

  onAddColClick = () => {
    const {columns} = this.state;
    this.setState({columns: [...columns, columns[0]]});
  };

  onAddRowClick = () => {
    const {rows} = this.state;
    this.setState({rows: [...rows, rows[0]]});
  };

  onDelColClick = () => {
    const {columns, activeIndexes} = this.state;
    columns.splice(activeIndexes[1], 1);
    this.setState({columns});

    if (columns.length === activeIndexes[1] || columns.length === 1) this.hideDelButtons();
  };

  onDelRowClick = () => {
    const {rows, activeIndexes} = this.state;
    rows.splice(activeIndexes[0], 1);
    this.setState({rows});

    if (rows.length === activeIndexes[0] || rows.length === 1) this.hideDelButtons();
  };

  render() {
    const {cellSize} = this.props;
    const {rows, columns} = this.state;

    return (
      <div className="grid">
        <GridButtons
          cellSize={cellSize}
          delButtonRowRef={Grid.delButtonRowRef}
          delButtonColRef={Grid.delButtonColRef}
          onAddRowClick={this.onAddRowClick}
          onAddColClick={this.onAddColClick}
          onDelColClick={this.onDelColClick}
          onDelRowClick={this.onDelRowClick}
        />
        <GridFields
          rows={rows}
          columns={columns}
          cellSize={cellSize}
          onColMouseOver={this.onColMouseOver}
          onGridMouseLeave={this.onGridMouseLeave}
        />
      </div>
    );
  }
}

export default Grid;
