import React, {Component} from 'react';
import './gridField.scss';

class GridField extends Component {
  static initialWidth;
  static initialHeight;

  constructor(props) {
    super(props);
    const {initialWidth, initialHeight} = props;
    GridField.initialWidth = initialWidth;
    GridField.initialHeight = initialHeight;
  }


  render() {
    const {cellSize, onColMouseOver, onGridMouseLeave} = this.props;
    return (
      <div className="grid-root" onMouseLeave={onGridMouseLeave}>
        {[...Array(GridField.initialHeight).keys()].map((index) => {
          return <GridRow
            key={index}
            width={GridField.initialWidth}
            cellSize={cellSize}
            onColMouseOver={onColMouseOver}
          />
        })}
      </div>
    );
  }
}

const GridRow = ({width, cellSize, onColMouseOver}) => {
  return (
    <div className="row">
      {[...Array(width).keys()].map((index) => {
        return <GridColumn
          key={index}
          cellSize={cellSize}
          onColMouseOver={onColMouseOver}
        />
      })}
    </div>)
};

const GridColumn = ({cellSize, onColMouseOver}) => {
  return <div className="column" style={{height: cellSize, width: cellSize}} onMouseOver={onColMouseOver}/>
};


export default GridField;