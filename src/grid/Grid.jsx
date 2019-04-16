import React, { Component } from 'react';
import GridFields from './components/gridField/GridFields';
import ActionButton from './components/actionButton/ActionButton';
import { getUniqValue } from './grid.service';

import './Grid.scss';
import PropTypes from 'prop-types';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [...Array(props.initialHeight).keys()].map(index =>
        getUniqValue(index)
      ),
      columns: [...Array(props.initialWidth).keys()].map(index =>
        getUniqValue(index)
      ),
      activeRowIndex: 0,
      activeColumnIndex: 0,
      isDelBtnRowVisible: false,
      isDelBtnColVisible: false,
      delBtnColLeft: 0,
      delBtnRowTop: 0,
      isDelBtnHovered: false
    };
  }

  hideDelButtons = () =>
    this.setState({
      isDelBtnRowVisible: false,
      isDelBtnColVisible: false,
      isDelBtnHovered: false
    });

  onColMouseOver = (e, rowIndex, colIndex) => {
    const currentColumn = e.target;
    const { rows, columns } = this.state;
    let newState = {
      ...this.state,
      activeRowIndex: rowIndex,
      activeColumnIndex: colIndex
    };

    if (columns.length > 1) {
      newState.isDelBtnColVisible = true;
      newState.delBtnColLeft = currentColumn.offsetLeft;
    }

    if (rows.length > 1) {
      newState.isDelBtnRowVisible = true;
      newState.delBtnRowTop = currentColumn.offsetTop;
    }
    this.setState(newState);
  };

  onGridMouseLeave = () => {
    setTimeout(() => {
      const { isDelBtnHovered } = this.state;
      if (!isDelBtnHovered) this.hideDelButtons();
    }, 200);
  };

  onDelBtnMouseEnter = () => this.setState({ isDelBtnHovered: true });

  onAddColClick = () =>
    this.setState(prevState => ({
      columns: [...prevState.columns, getUniqValue(prevState.columns.length)]
    }));

  onAddRowClick = () =>
    this.setState(prevState => ({
      rows: [...prevState.rows, getUniqValue(prevState.rows.length)]
    }));

  onDelColClick = () => {
    const { columns, activeColumnIndex } = this.state;
    if (columns.length === 1) return;
    columns.splice(activeColumnIndex, 1);
    this.setState({ columns });

    if (columns.length === activeColumnIndex || columns.length === 1)
      this.hideDelButtons();
  };

  onDelRowClick = () => {
    const { rows, activeRowIndex } = this.state;
    if (rows.length === 1) return;
    rows.splice(activeRowIndex, 1);
    this.setState({ rows });

    if (rows.length === activeRowIndex || rows.length === 1)
      this.hideDelButtons();
  };

  render() {
    const { cellSize } = this.props;
    const {
      rows,
      columns,
      isDelBtnColVisible,
      isDelBtnRowVisible,
      delBtnRowTop,
      delBtnColLeft
    } = this.state;
    return (
      <div className="grid">
        <ActionButton
          className="add-btn-row"
          cellSize={cellSize}
          onClick={this.onAddRowClick}
        />
        <ActionButton
          className="add-btn-col"
          cellSize={cellSize}
          onClick={this.onAddColClick}
        />
        {isDelBtnRowVisible && (
          <ActionButton
            className="del-btn-row"
            cellSize={cellSize}
            text="-"
            style={{ top: `${delBtnRowTop}px` }}
            onDelBtnMouseEnter={this.onDelBtnMouseEnter}
            onDelBtnMouseLeave={this.hideDelButtons}
            onClick={this.onDelRowClick}
          />
        )}
        {isDelBtnColVisible && (
          <ActionButton
            className="del-btn-col"
            cellSize={cellSize}
            text="-"
            style={{ left: `${delBtnColLeft}px` }}
            onDelBtnMouseEnter={this.onDelBtnMouseEnter}
            onDelBtnMouseLeave={this.hideDelButtons}
            onClick={this.onDelColClick}
          />
        )}
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

Grid.propTypes = {
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
  cellSize: PropTypes.string
};

export default Grid;
