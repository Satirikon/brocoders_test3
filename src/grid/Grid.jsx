import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GridFields from './Components/GridField/GridFields';
import ActionButton from './Components/ActionButton/ActionButton';
import {getUniqValue} from './grid.service';

import './Grid.scss';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [...Array(props.initialHeight).keys()].map((index)=>getUniqValue(index)),
      columns: [...Array(props.initialWidth).keys()].map((index)=>getUniqValue(index)),
      activeIndexes: [0, 0],
      delBtnStyles: [{top: 0, display: 'none'}, {left: 0, display: 'none'}]
    };
  }

  hideDelButtons = () => {
    this.setState({delBtnStyles: [{top: 0, display: 'none'}, {left: 0, display: 'none'}]});
  };

  onColMouseOver = (e, rowIndex, colIndex) => {
    const currentColumn = e.target;
    const {rows, columns} = this.state;
    let newState = {...this.state, activeIndexes: [rowIndex, colIndex]};
    if (columns.length > 1) {
      newState.delBtnStyles[1] = {left:`${currentColumn.offsetLeft}px`, display: 'inline'};
    }
    if (rows.length > 1) {
      newState.delBtnStyles[0] = {top:`${currentColumn.offsetTop}px`, display: 'inline'};
    }
    this.setState(newState);
  };

  onGridMouseLeave = () => {
    setTimeout(() => {
      const selected = ReactDOM.findDOMNode(this).querySelectorAll('.del-btn-col:hover, .del-btn-row:hover');
      if (!selected.length) this.hideDelButtons();
    }, 200);
  };

  onAddColClick = () => {
    const {columns} = this.state;
    this.setState({columns: [...columns, getUniqValue(columns[0])]});
  };

  onAddRowClick = () => {
    const {rows} = this.state;
    this.setState({rows: [...rows, getUniqValue(rows[0])]});
  };

  onDelColClick = () => {
    const {columns, activeIndexes} = this.state;
    if (columns.length === 1) return;
    columns.splice(activeIndexes[1], 1);
    this.setState({columns});

    if (columns.length === activeIndexes[1] || columns.length === 1) this.hideDelButtons();
  };

  onDelRowClick = () => {
    const {rows, activeIndexes} = this.state;
    if (rows.length === 1) return;
    rows.splice(activeIndexes[0], 1);
    this.setState({rows});

    if (rows.length === activeIndexes[0] || rows.length === 1) this.hideDelButtons();
  };

  render() {
    const {cellSize} = this.props;
    const {rows, columns, delBtnStyles} = this.state;

    return (
      <div className="grid">
        <ActionButton
          className="add-btn-row"
          cellSize={cellSize}
          onClick={this.onAddRowClick}/>
        <ActionButton
          className="add-btn-col"
          cellSize={cellSize}
          onClick={this.onAddColClick}/>
        <ActionButton
          className="del-btn-row"
          cellSize={cellSize}
          text="-"
          style={delBtnStyles[0]}
          onClick={this.onDelRowClick}/>
        <ActionButton
          className="del-btn-col"
          cellSize={cellSize}
          text="-"
          style={delBtnStyles[1]}
          onClick={this.onDelColClick}/>

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
