import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '@bbc/psammead-topic-tags';
import { pathOr } from 'ramda';
import SectionLabel from '@bbc/psammead-section-label';
import styled from '@emotion/styled';
import { arrayOf, bool, shape, string } from 'prop-types';
import { GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

import { C_WHITE } from '@bbc/psammead-styles/colours';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';

const eventTrackingData = {
  componentName: 'topics',
};

const StyledTopicsWrapper = styled.aside`
  padding-bottom: ${GEL_SPACING_QUIN};
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: 1rem;
  }
`;

const RelatedTopics = ({
  topics,
  mobileDivider,
  bar,
  className,
  backgroundColour,
}) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewRef = useViewTracker(eventTrackingData);
  const heading = pathOr('Related Topics', ['relatedTopics'], translations);
  const topicsPath = pathOr('topics', ['topicsPath'], translations);

  const getTopicPageUrl = id => {
    return variant
      ? `${process?.env?.SIMORGH_BASE_URL}/${service}/${variant}/${topicsPath}/${id}`
      : `${process?.env?.SIMORGH_BASE_URL}/${service}/${topicsPath}/${id}`;
  };

  return (
    topics && (
      <StyledTopicsWrapper
        aria-labelledby="related-topics"
        role="complementary"
        className={className}
      >
        <StyledSectionLabel
          bar={bar}
          script={script}
          service={service}
          dir={dir}
          labelId="related-topics"
          mobileDivider={mobileDivider}
          backgroundColor={backgroundColour}
        >
          {heading}
        </StyledSectionLabel>
        <TopicTags service={service} script={script}>
          {topics.length === 1 ? (
            <TopicTag
              name={topics[0].topicName}
              link={getTopicPageUrl(topics[0].topicId)}
              onClick={clickTrackerHandler}
              ref={viewRef}
              key={topics[0].topicId}
            />
          ) : (
            topics.map(({ topicName, topicId }) => (
              <TopicTag
                name={topicName}
                link={getTopicPageUrl(topicId)}
                onClick={clickTrackerHandler}
                ref={viewRef}
                key={topicId}
              />
            ))
          )}
        </TopicTags>
      </StyledTopicsWrapper>
    )
  );
};

RelatedTopics.propTypes = {
  topics: arrayOf(
    shape({
      topicName: string,
      topicId: string,
    }),
  ),
  mobileDivider: bool,
  bar: bool,
  className: string,
  backgroundColour: string,
};

RelatedTopics.defaultProps = {
  topics: null,
  mobileDivider: true,
  bar: true,
  className: null,
  backgroundColour: C_WHITE,
};

export default RelatedTopics;
