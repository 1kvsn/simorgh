import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import path from 'ramda/src/path';
import RecommendationsPromo from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

describe('RecommendationsPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: {
            enabled: true,
          },
        }}
      >
        <RecommendationsPromo promo={promos[0]} dir="ltr" />,
      </ToggleContextProvider>
    </ServiceContextProvider>,
  );

  it('should contain skip link for screen readers', () => {
    const { container } = render(Component);
  });

  it('should render the title as a div', () => {
    const { container } = render(Component);
  });
});
