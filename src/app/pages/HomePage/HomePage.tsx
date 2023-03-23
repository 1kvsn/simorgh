/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { VisualProminence, VisualStyle } from '../../models/types/curationData';
import Curation from '../../components/Curation';
import VisuallyHiddenText from '../../legacy/psammead/psammead-visually-hidden-text/src';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';

interface HomePageProps {
  pageData: {
    pageType: string;
    id?: string;
    title: string;
    curations: CurationData[];
  };
}

const HomePage = ({ pageData }: HomePageProps) => {
  const { curations } = pageData;
  const { translations, product, serviceLocalizedName } =
    useContext(ServiceContext);
  const { topStoriesTitle, home } = translations;

  return (
    <>
      <main css={styles.main}>
        <VisuallyHiddenText id="content" tabIndex={-1} as="h1">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
          </span>
        </VisuallyHiddenText>
        <div css={styles.inner}>
          {curations.map(
            ({
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
            }) => {
              return (
                <React.Fragment key={`${curationId}-${position}`}>
                  <Curation
                    headingLevel={curationTitle ? 3 : 2}
                    visualStyle={visualStyle as VisualStyle}
                    visualProminence={visualProminence as VisualProminence}
                    promos={summaries}
                    title={curationTitle}
                    topStoriesTitle={topStoriesTitle}
                    position={position}
                    link={link}
                    curationLength={curations && curations.length}
                  />
                </React.Fragment>
              );
            },
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
