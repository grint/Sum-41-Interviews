import { Sum41Family } from './app.po';

describe('Sum 41 Family', () => {
  let page: Sum41Family;

  beforeEach(() => {
    page = new Sum41Family();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Home');
    expect(page.getNavbarElement(1)).toEqual('Cats');
    expect(page.getNavbarElement(2)).toEqual('Interviews');
    expect(page.getNavbarElement(3)).toEqual('Login');
    expect(page.getNavbarElement(4)).toEqual('Register');
  });
});
