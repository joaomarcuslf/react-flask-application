import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ControlledInput from '../../../app/components/form/controlled-input';

const getChildRecurr = (tree, root) => {
  if(tree.children) {
    return getChildRecurr(
      tree.children[root] ||
      tree.children[0],
      root
    );
  }

  return tree;
}

configure({adapter: new Adapter()});

test('ControlledInput should render the <DefaultInput /> when none is given', () => {
  const component = shallow(
    <ControlledInput
      placeholder="Test placeholder"
      name="test"
      value ="Teste value"
    />,
  );

  expect(component.text()).toEqual('<DefaultInput />');
});

test('ControlledInput should render the <CalendarInput /> when type calendar is given', () => {
  const component = shallow(
    <ControlledInput
      type="calendar"
      placeholder="Test placeholder"
      name="test"
      value ="Teste value"
    />,
  );

  expect(component.text()).toEqual('<CalendarInput />');
});

test('ControlledInput should render the <SelectInput /> when type select is given', () => {
  const component = shallow(
    <ControlledInput
      type="select"
      placeholder="Test placeholder"
      name="test"
      value ="Teste value"
    />,
  );

  expect(component.text()).toEqual('<SelectInput />');
});
