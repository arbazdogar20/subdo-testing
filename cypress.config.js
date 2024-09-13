const {defineConfig} = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      config.env = {
        API_URL: 'http://localhost:3001',
        EMAIL: 'admin@desolint.com',
        PASSWORD: 'Abc123!abc',
        WRONG_EMAIL: 'invalidEmail',
        WRONG_PASSWORD: 'password',
        VALID_TOKEN:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJNdWhhbW1hZCIsImxhc3ROYW1lIjoiSWJ0aXNhbSIsImVtYWlsIjoiaWJ0aXNhbS50dWZhaWxAZGVzb2xpbnQuY29tIiwic3lzdGVtUm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3MTU3NTYxOTgsImV4cCI6MTcxNjM2MDk5OH0.Om2fpl5ZfFIx0ht2gwn59sXzWfAfzsflUhDWVL19GL8',
        INVALID_TOKEN:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM1OThkMDRiNTExZDhiYzU3YWRlMiIsImVtYWlsIjoibWlyemFpYnRpc2FtNDJAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3MTQ2NDEyOTMsImV4cCI6MTcxNTI0NjA5M30.2fXyb1yNM7og4DL4P7Ggkl4_RNZdNwUf1Twn4JE75HY',
        VALID_RESET_TOKEN:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlidGlzYW0udHVmYWlsQGRlc29saW50LmNvbSIsImlhdCI6MTcxNTc2NzkyMywiZXhwIjoxNzE1NzcxNTIzfQ.-yCb5awuw6WH5Huuv_hVbmpII6gkYgD1lf92VM9Zx4c',
      };
      return config;
    },
  },
});
