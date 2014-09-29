module.exports = {
  'List Users' : function (browser) {
    browser
      .url(browser.launch_url + '/admin/users')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#title', 'List Users')
      .end();
  }
};
