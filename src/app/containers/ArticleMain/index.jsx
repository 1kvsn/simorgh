import React, { Fragment, useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import audioVideo from '../AudioVideo';
import AudioVideoHead from '../../components/AudioVideoHead';
import { RequestContext } from '../../contexts/RequestContext';
import generateAVSettings from '../../lib/utilities/audioVideo/generateAVSettings';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
  audio: audioVideo,
  video: audioVideo,
};

const avEnabledComment = (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: '<!-- av-enabled -->' }} />
);

const ArticleMain = ({ articleData }) => {
  const {
    env,
    platform,
    statsDestination,
    statsPageIdentifier,
  } = React.useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  const audioVideoBlocks = blocks.filter(
    block => block.type === 'audio' || block.type === 'video',
  );
  const hasAV = audioVideoBlocks.length > 0;
  const { audiovideo: audioVideoEnabled } = useContext(DialContext);

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      {hasAV && platform === 'canonical' ? (
        <AudioVideoHead
          audioVideoAssets={generateAVSettings({
            audioVideoBlocks,
            env,
            platform,
            statsDestination,
            statsPageIdentifier,
          })}
        />
      ) : null}
      <main role="main">
        {audioVideoEnabled && avEnabledComment}
        <GhostWrapper>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
