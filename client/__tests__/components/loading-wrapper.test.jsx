import React from 'react';
import renderer from 'react-test-renderer';
import LoadingWrapper from '../../app/components/loading-wrapper';

const getChildRecurr = (tree, root) => {
  if (tree.children) {
    return getChildRecurr(tree.children[root] || tree.children[0], root);
  }

  return tree;
};

test('LoadingWrapper shows an loading text before showing the real component', () => {
  const component = renderer.create(
    <LoadingWrapper loading>Test</LoadingWrapper>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
  expect(getChildRecurr(tree)).toEqual('Loading...');
});

test('LoadingWrapper shows the error message if it is provided', () => {
  const component = renderer.create(
    <LoadingWrapper loading={false} error={{ message: 'Error' }}>
      Test
    </LoadingWrapper>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
  expect(getChildRecurr(tree)).toEqual('Request Error.');
  expect(getChildRecurr(tree, 1)).toEqual('Error');
});

test('LoadingWrapper shows the provided child when everything is fine', () => {
  const component = renderer.create(
    <LoadingWrapper loading={false}>Test</LoadingWrapper>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
  expect(getChildRecurr(tree)).toEqual('Test');
});
