import React, {Component, createRef, cloneElement} from 'react';
import './grid.scss';
import ReactDOM from 'react-dom';
import GridField from './gridField/gridField'
import GridButtons from './gridButton/gridButton'

class Grid extends Component {
  static delButtonRowRef = createRef();
  static delButtonColRef = createRef();
  state = {
    currentColumn: null
  };

  constructor(props) {
    super(props);
    this.hideDelButtons = this.hideDelButtons.bind(this);
    this.onColMouseOver = this.onColMouseOver.bind(this);
    this.onGridMouseLeave = this.onGridMouseLeave.bind(this);
    this.onAddRowClick = this.onAddRowClick.bind(this);
    this.onAddColClick = this.onAddColClick.bind(this);
    this.onDelColClick = this.onDelColClick.bind(this);
    this.onDelRowClick = this.onDelRowClick.bind(this);
  }

  hideDelButtons = () => {
    Grid.delButtonColRef.current.style.display = Grid.delButtonRowRef.current.style.display = 'none';
  };

  onColMouseOver = (e) => {
    const currentColumn = e.target;
    if (currentColumn.parentNode.children.length > 1) {
      const {style} = Grid.delButtonColRef.current;
      style.left = `${currentColumn.offsetLeft}px`;
      style.display = 'inline';
    }
    if (currentColumn.parentNode.parentNode.children.length > 1) {
      const {style} = Grid.delButtonRowRef.current;
      style.top = `${currentColumn.offsetTop}px`;
      style.display = 'inline';
    }
    this.setState({currentColumn});
  };

  onGridMouseLeave = () => {
    setTimeout(() => {
      if (!Grid.delButtonColRef.current.matches(':hover') && !Grid.delButtonRowRef.current.matches(':hover')) {
        this.hideDelButtons();
      }
    }, 200);
  };

  onAddColClick = () => {
    const {currentColumn} = this.state;
    const rows = currentColumn.parentNode.parentNode.childNodes;
    for (let row of rows){
      row.appendChild(currentColumn.cloneNode(true));
    }
  };
  onAddRowClick = () => {
    const {currentColumn} = this.state;
    const clonedRow = currentColumn.parentNode.cloneNode(true);
    currentColumn.parentNode.parentNode.appendChild(clonedRow);
  };

onDelColClick = () =>{
  const {currentColumn} = this.state;
  const parent = currentColumn.parentNode;
  const index = Array.from(parent.childNodes).indexOf(currentColumn,0);
  const rows = currentColumn.parentNode.parentNode.childNodes;
  for (let row of rows){
    row.childNodes[index].remove();
  }
  if(parent.childNodes.length <= 1 || !parent.childNodes[index]){
    this.hideDelButtons();
  } else {
    this.setState({currentColumn: parent.childNodes[index]});
  }
};

onDelRowClick = () =>{
  const {currentColumn} = this.state;
  const parent = currentColumn.parentNode;
  const newParent = parent.nextSibling;
  parent.remove();
  if(!newParent || newParent.parentNode.childNodes.length <=1){
    this.hideDelButtons();
  } else{
    this.setState({currentColumn: newParent.childNodes[0]});
  }
};

  render() {
    const {initialWidth, initialHeight, cellSize} = this.props;
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
        <GridField
          initialWidth={initialWidth}
          initialHeight={initialHeight}
          cellSize={cellSize}
          onColMouseOver={this.onColMouseOver}
          onGridMouseLeave={this.onGridMouseLeave}
        />

      </div>
    );
  }
}

export default Grid;
