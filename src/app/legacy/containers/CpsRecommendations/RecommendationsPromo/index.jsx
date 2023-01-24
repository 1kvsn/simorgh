import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import { getPica } from '#psammead/gel-foundations/src/typography';
import {
  C_METAL,
  C_GREY_2,
  C_GREY_10,
  C_GHOST,
} from '#psammead/psammead-styles/src/colours';
import { shape, string, oneOfType, boolean } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import Grid from '../../../components/Grid';
import RecommendationsImage from '../RecommendationsPromoImage';
import useCombinedClickTrackerHandler from '../../StoryPromo/useCombinedClickTrackerHandler';
import extractPromoData from './utility';

const makeStyledPromoWrapper = isArticle => styled.div`
  position: relative;
  padding: ${GEL_SPACING};
  margin-top: ${GEL_SPACING};
  background-color: ${isArticle ? C_GHOST : C_GREY_2};
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 4.7rem;
  vertical-align: top;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 6.8rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 7.5rem;
  }
`;

const TextWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 7.5rem);
  padding: 0 ${GEL_SPACING};
  vertical-align: top;
  height: 100%;

  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    width: calc(100% - 5rem);
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const Link = styled.a`
  position: static;
  color: ${C_GREY_10};
  text-decoration: none;
  overflow-wrap: break-word;

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    z-index: 1;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }
`;

const StyledHeadline = styled.div`
  ${({ service }) => getSerifMedium(service)}
  ${({ script }) => getPica(script)}
  color: ${C_GREY_10};
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const RecommendationsPromo = ({ promo, eventTrackingData, isArticle }) => {
  const { script, service } = useContext(ServiceContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  const { headline, url, indexImage } = extractPromoData({ promo });

  const StyledPromoWrapper = makeStyledPromoWrapper(isArticle);

  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      enableGelGutters
    >
      <StyledPromoWrapper data-e2e="story-promo-wrapper">
        <ImageWrapper>
          <RecommendationsImage indexImage={indexImage} lazyLoad />
        </ImageWrapper>
        <TextWrapper>
          <StyledHeadline script={script} service={service}>
            <Link
              href={url}
              onClick={eventTrackingData ? handleClickTracking : null}
            >
              {headline}
            </Link>
          </StyledHeadline>
        </TextWrapper>
      </StyledPromoWrapper>
    </Grid>
  );
};

RecommendationsPromo.propTypes = {
  promo: oneOfType([shape(storyItem)]).isRequired,
  isArticle: boolean,
  eventTrackingData: shape({
    block: shape({
      componentName: string,
    }),
    link: shape({
      componentName: string,
      url: string,
      format: string,
    }),
  }),
};

RecommendationsPromo.defaultProps = {
  eventTrackingData: null,
  isArticle: false,
};

export default RecommendationsPromo;
