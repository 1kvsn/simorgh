import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import testsForAMPOnly from './testsForAMPOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';

const pageType = 'onDemandRadio';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    // eslint-disable-next-line prefer-const
    let { variant, name: service } = config[serviceId];
    if (variant !== 'default') {
      const capitaliseVariant =
        variant.charAt(0).toUpperCase() + variant.slice(1);
      service += capitaliseVariant;
    }
    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);

          const newPath = `${currentPath}${overrideRendererOnTest()}`;

          visitPage(newPath, pageType);
        });
        crossPlatformTests({
          service,
          pageType,
          variant,
        });
        testsForCanonicalOnly({
          service,
          pageType,
          variant,
        });
      });
    });
    paths
      .map(path => `${path}.amp`)
      .forEach(currentPath => {
        describe(`${pageType} - ${currentPath}`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(currentPath, pageType);
          });
          crossPlatformTests({
            service,
            pageType,
            variant,
            isAmp: true,
          });
          testsForAMPOnly({
            service,
            pageType,
            variant,
          });
        });
      });
  });
