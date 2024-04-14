module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^axios$": "axios/dist/node/axios.cjs"
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/setupTests.js",
    "!src/**/index.js",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
