module.exports = {
  preset: 'react-native',
  moduleDirectories: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@env': 'react-native-dotenv',
    '@gr4vy/embed-react-native': '<rootDir>/src',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
