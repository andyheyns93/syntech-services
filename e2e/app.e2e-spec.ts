import { SynTechServicesPage } from './app.po';

describe('syn-tech-services App', () => {
  let page: SynTechServicesPage;

  beforeEach(() => {
    page = new SynTechServicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
