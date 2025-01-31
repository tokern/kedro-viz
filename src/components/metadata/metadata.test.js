import React from 'react';
import MetaData from './index';
import { getClickedNodeMetaData } from '../../selectors/metadata';
import { toggleNodeClicked } from '../../actions/nodes';
import { setup, prepareState } from '../../utils/state.mock';
import animals from '../../utils/data/animals.mock.json';

const salmonTaskNodeId = '443cf06a';
const catDatasetNodeId = '9d989e8d';
const rabbitParamsNodeId = 'c38d4c6a';

describe('MetaData', () => {
  const mount = (props) => {
    return setup.mount(<MetaData visible={true} />, {
      // Click the expected node
      afterLayoutActions: [() => toggleNodeClicked(props.nodeId)],
    });
  };

  const textOf = (elements) => elements.map((element) => element.text());
  const title = (wrapper) => wrapper.find('.pipeline-metadata__title');
  const rowIcon = (row) => row.find('svg.pipeline-metadata__icon');
  const rowValue = (row) => row.find('.pipeline-metadata__value');
  const rowByLabel = (wrapper, label) =>
    // Using attribute since traversal by sibling not supported
    wrapper.find(`.pipeline-metadata__row[data-label="${label}"]`);

  describe('All nodes', () => {
    it('limits parameters to 10 values and expands when button clicked', () => {
      // Get metadata for a sample
      const metadata = getClickedNodeMetaData(
        prepareState({
          data: animals,
          afterLayoutActions: [() => toggleNodeClicked(salmonTaskNodeId)],
        })
      );

      // Add extra mock parameters
      metadata.parameters = Array.from({ length: 20 }, (_, i) => `Test: ${i}`);

      const wrapper = setup.mount(
        <MetaData visible={true} metadata={metadata} />
      );

      const parametersRow = () => rowByLabel(wrapper, 'Parameters (20):');
      const expandButton = parametersRow().find(
        '.pipeline-metadata__value-list-expand'
      );

      // Expand button should show remainder
      expect(expandButton.text()).toBe('+ 10 more');

      // Should show 10 values
      expect(parametersRow().find('.pipeline-metadata__value').length).toBe(10);

      // User clicks to expand
      expandButton.simulate('click');

      // Should show all 20 values
      expect(parametersRow().find('.pipeline-metadata__value').length).toBe(20);
    });
  });

  describe('Task nodes', () => {
    it('shows the node type as an icon', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      expect(rowIcon(wrapper).hasClass('pipeline-node-icon--type-task')).toBe(
        true
      );
    });

    it('shows the node name as the title', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      expect(textOf(title(wrapper))).toEqual(['salmon']);
    });

    it('shows the node type as text', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Type:');
      expect(textOf(rowValue(row))).toEqual(['task']);
    });

    it('shows the node parameters', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Parameters (-):');
      expect(textOf(rowValue(row))).toEqual(['-']);
    });

    it('shows the node inputs', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Inputs:');
      expect(textOf(rowValue(row))).toEqual([
        'Cat',
        'Dog',
        'Parameters',
        'Params:rabbit',
      ]);
    });

    it('shows the node outputs', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Outputs:');
      expect(textOf(rowValue(row))).toEqual(['Horse', 'Sheep']);
    });

    it('shows the node tags', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Tags:');
      expect(textOf(rowValue(row))).toEqual(['Small']);
    });

    it('shows the node pipeline', () => {
      const wrapper = mount({ nodeId: salmonTaskNodeId });
      const row = rowByLabel(wrapper, 'Pipeline:');
      expect(textOf(rowValue(row))).toEqual(['Default']);
    });
  });

  describe('Dataset nodes', () => {
    it('shows the node type as an icon', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      expect(rowIcon(wrapper).hasClass('pipeline-node-icon--type-data')).toBe(
        true
      );
    });

    it('shows the node name as the title', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      expect(textOf(title(wrapper))).toEqual(['Cat']);
    });

    it('shows the node type as text', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      const row = rowByLabel(wrapper, 'Type:');
      expect(textOf(rowValue(row))).toEqual(['data']);
    });

    it('shows the node dataset type', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      const row = rowByLabel(wrapper, 'Dataset Type:');
      expect(textOf(rowValue(row))).toEqual(['-']);
    });

    it('shows the node filepath', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      const row = rowByLabel(wrapper, 'File Path:');
      expect(textOf(rowValue(row))).toEqual(['-']);
    });

    it('shows the node tags', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      const row = rowByLabel(wrapper, 'Tags:');
      expect(textOf(rowValue(row))).toEqual(['Large', 'Medium', 'Small']);
    });

    it('shows the node pipeline', () => {
      const wrapper = mount({ nodeId: catDatasetNodeId });
      const row = rowByLabel(wrapper, 'Pipeline:');
      expect(textOf(rowValue(row))).toEqual(['Default']);
    });
  });

  describe('Parameter nodes', () => {
    it('shows the node type as an icon', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      expect(
        rowIcon(wrapper).hasClass('pipeline-node-icon--type-parameters')
      ).toBe(true);
    });

    it('shows the node name as the title', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      expect(textOf(title(wrapper))).toEqual(['Params:rabbit']);
    });

    it('shows the node type as text', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      const row = rowByLabel(wrapper, 'Type:');
      expect(textOf(rowValue(row))).toEqual(['parameters']);
    });

    it('shows the node filepath', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      const row = rowByLabel(wrapper, 'File Path:');
      expect(textOf(rowValue(row))).toEqual(['-']);
    });

    it('shows the node parameters', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      const row = rowByLabel(wrapper, 'Parameters (-):');
      expect(textOf(rowValue(row))).toEqual(['-']);
    });

    it('shows the node tags', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      const row = rowByLabel(wrapper, 'Tags:');
      expect(textOf(rowValue(row))).toEqual(['Small']);
    });

    it('shows the node pipeline', () => {
      const wrapper = mount({ nodeId: rabbitParamsNodeId });
      const row = rowByLabel(wrapper, 'Pipeline:');
      expect(textOf(rowValue(row))).toEqual(['Default']);
    });
  });
});
