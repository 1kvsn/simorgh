export default ({ pageData }) => {
  describe('Page content', () => {
    const firstItemHeadline = document.querySelector(
      '[data-testid="topic-promos"] > li  h3 a',
    );

    it('First item in the first curation is the correct headline', () => {
      expect(firstItemHeadline).toBeInTheDocument();
      expect(firstItemHeadline.textContent).toMatchSnapshot();
    });
  });

  it('should display a hierarchical grid', () => {
    const hierarchicalGrid = document.querySelector(
      '[data-testid="hierarchical-grid"]',
    );

    expect(hierarchicalGrid).toBeInTheDocument();
  });

  it('should render the correct number of curations', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries, mostRead }) =>
        (summaries && summaries?.length > 0) || mostRead,
    );

    const numberOfcurations = document.querySelectorAll('main h2').length;

    expect(numberOfcurations).toEqual(curationsWithSummaries.length);
  });
};
