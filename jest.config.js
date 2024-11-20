module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!module-to-transform|another-module)",
  ],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup-tests.js"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/.jest/mock/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
