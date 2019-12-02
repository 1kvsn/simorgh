import React, { useContext } from 'react';
import { NavigationUl, NavigationLi } from '@bbc/psammead-navigation';
import {
  Dropdown,
  DropdownUl,
  DropdownLi,
} from '@bbc/psammead-navigation/dropdown';
import { ServiceContext } from '#contexts/ServiceContext';
import Canonical from './index.canonical';
import { RequestContext } from '#contexts/RequestContext';
import Amp from './index.amp';

const Navigation = () => {
  const { platform } = useContext(RequestContext);

  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );
  const { currentPage, skipLinkText } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  const scrollableListItems = (
    <NavigationUl>
      {navigation.map((item, index) => {
        const { title, url } = item;
        const active = index === 0;

        return (
          <NavigationLi
            key={title}
            url={url}
            script={script}
            active={active}
            currentPageText={currentPage}
            service={service}
          >
            {title}
          </NavigationLi>
        );
      })}
    </NavigationUl>
  );

  const dropdownListItems = (
    <Dropdown>
      <DropdownUl>
        {navigation.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <DropdownLi
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPage}
              service={service}
            >
              {title}
            </DropdownLi>
          );
        })}
      </DropdownUl>
    </Dropdown>
  );

  return platform === 'amp' ? (
    <Amp
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      dir={dir}
      script={script}
      service={service}
    />
  ) : (
    <Canonical
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      dir={dir}
      script={script}
      service={service}
    />
  );
};

export default Navigation;
