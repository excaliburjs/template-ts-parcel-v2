const { expectLoaded, expectPage, test } = require('@excaliburjs/testing');

test('A parcel v2 template', async (page) => {
  await expectLoaded();
  await page.waitForTimeout(500);
  await expectPage('Shows sword', './test/images/actual-play.png').toBe('./test/images/expected-play.png');
});