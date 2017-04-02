import { BirNg4Page } from './app.po';

describe('bir-ng4 App', () => {
  let page: BirNg4Page;

  beforeEach(() => {
    page = new BirNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
