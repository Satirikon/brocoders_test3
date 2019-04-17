import React, { Component } from 'react';
import GridFields from './components/gridField/GridFields';
import ActionButton from './components/actionButton/ActionButton';
import { getUniqValue } from './grid.service';

import './Grid.scss';
import PropTypes from 'prop-types';

const BUTTON_PADDING = 5;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.timer = null;

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
      isDelBtnColVisible: false
    };
  }

  clearTimer = () => (this.timer = null);

  hideDelButtons = () =>
    this.setState({
      isDelBtnRowVisible: false,
      isDelBtnColVisible: false,
      isDelBtnHovered: false
    });

  onColMouseOver = (e, rowIndex, colIndex) => {
    const { rows, columns } = this.state;
    let newState = {
      activeRowIndex: rowIndex,
      activeColumnIndex: colIndex
    };

    if (columns.length > 1) newState.isDelBtnColVisible = true;

    if (rows.length > 1) newState.isDelBtnRowVisible = true;

    this.setState(newState);
  };

  onGridMouseLeave = () => {
    this.timer = setTimeout(() => {
      if (this.timer) this.hideDelButtons();
    }, 200);
  };

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
      activeRowIndex,
      activeColumnIndex
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
            style={{
              top: `${(activeRowIndex + 1) * cellSize + BUTTON_PADDING}px`
            }}
            onMouseEnter={this.clearTimer}
            onMouseLeave={this.hideDelButtons}
            onClick={this.onDelRowClick}
          />
        )}
        {isDelBtnColVisible && (
          <ActionButton
            className="del-btn-col"
            cellSize={cellSize}
            text="-"
            style={{
              left: `${(activeColumnIndex + 1) * cellSize + BUTTON_PADDING}px`
            }}
            onMouseEnter={this.clearTimer}
            onMouseLeave={this.hideDelButtons}
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
  cellSize: PropTypes.number
};

export default Grid;
