// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "default e2e tests": (browser) => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent("h1")
      .assert.containsText("h1", "Load a CSV file")
      .assert.elementPresent("input[type='file']")
      .end();
  },
};
