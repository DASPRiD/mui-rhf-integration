/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    clearMocks: true,
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
    ],
};
