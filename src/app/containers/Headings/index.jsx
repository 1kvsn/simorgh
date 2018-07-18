import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/proptypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import * as Headings from '../../components/Headings';

const HeadingsContainer = ({ blocks, type }) => {
  const Heading = Headings[type];
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <Heading>{text}</Heading>;
};

HeadingsContainer.propTypes = headlineModelPropTypes;

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
