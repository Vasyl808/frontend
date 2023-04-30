module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|sass)$":
        "D:/web_react_pharmacy/__mocks__/fileMock.js",
    },
   
  
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios|react-toastify))",
      "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
      "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
      "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ],
    collectCoverageFrom: [
      "src/components/Footer/*.{js,jsx}",
      "src/components/Header/*.{js,jsx}",
      "src/components/Spinner/*.{js,jsx}",
      "src/components/UI/*.{js,jsx}",
      "src/pages/*.{js,jsx}",
      "src/hook/*.{js,jsx}",
      "src/utils/*.{js,jsx}",
      "!src/redux/slices/*.{js,jsx}"
    ],
    setupFilesAfterEnv: [
      "D:/web_react_pharmacy/setupTests.js",
    ],
  };