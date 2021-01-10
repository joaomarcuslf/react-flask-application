import React from 'react';
import renderer from 'react-test-renderer';
import FormGroup from '../../../app/components/form/form-group';

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

test('FormGroup wraps the visualization for the input showing it\'s label', () => {
  const component = renderer.create(
    <FormGroup label="Test Label" name="test" error={{}}>
      Test
    </FormGroup>,
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
  expect(getChildRecurr(tree)).toEqual('Test Label');
  expect(getChildRecurr(tree, 2)).toEqual('Test');
});
