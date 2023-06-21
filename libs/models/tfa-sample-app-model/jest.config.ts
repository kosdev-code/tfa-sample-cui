/* eslint-disable */
export default {
  displayName: 'models-tfa-sample-app-model',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/models/tfa-sample-app-model',
};
