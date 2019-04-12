import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from './grid';

Enzyme.configure({adapter: new Adapter});

it('Should render grid with correct values.', () => {
  const rowColCounter = 4;
  const GridDom = mount(<Grid initialWidth={rowColCounter} initialHeight={rowColCounter}/>);
  expect(GridDom.find('.row').length).toEqual(rowColCounter);
  expect(GridDom.find('.column').length).toEqual(rowColCounter * rowColCounter);
  GridDom.unmount();
});

it('Should add 1 row and 1 column', () => {
  const rowColCounter = 4;
  const GridDom = mount(<Grid initialWidth={rowColCounter} initialHeight={rowColCounter}/>);

  expect(GridDom.find('button.add-btn-row').length).toEqual(1);
  GridDom.find('button.add-btn-row').simulate('click');
  expect(GridDom.find('.row').length).toEqual(rowColCounter + 1);

  expect(GridDom.find('button.add-btn-col').length).toEqual(1);
  GridDom.find('button.add-btn-col').simulate('click');
  expect(GridDom.find('.column').length).toEqual((rowColCounter + 1) * (rowColCounter + 1));

  GridDom.unmount();
});

it('Should remove 1 row and 1 column', () => {
  const rowColCounter = 4;
  const GridDom = mount(<Grid initialWidth={rowColCounter} initialHeight={rowColCounter}/>);

  expect(GridDom.find('button.del-btn-row').length).toEqual(1);
  GridDom.find('button.del-btn-row').simulate('click');
  expect(GridDom.find('.row').length).toEqual(rowColCounter - 1);

  expect(GridDom.find('button.del-btn-col').length).toEqual(1);
  GridDom.find('button.del-btn-col').simulate('click');
  expect(GridDom.find('.column').length).toEqual((rowColCounter - 1) * (rowColCounter - 1));

  GridDom.unmount();
});

it('Should not remove last row and last column', () => {
  const rowColCounter = 1;
  const GridDom = mount(<Grid initialWidth={rowColCounter} initialHeight={rowColCounter}/>);

  GridDom.find('button.del-btn-row').simulate('click');
  expect(GridDom.find('.row').length).toEqual(rowColCounter);

  GridDom.find('button.del-btn-col').simulate('click');
  expect(GridDom.find('.column').length).toEqual(rowColCounter);

  GridDom.unmount();
});