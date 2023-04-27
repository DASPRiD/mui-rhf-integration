/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    clearMocks: true,
    transform: {
        '^.+\\.[jt]sx?$': [
            'ts-jest',
            {isolatedModules: true},
        ],
    },
    moduleNameMapper: {
        '^(\\.\\.?\\/.+)\\.jsx?$': '$1'
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
    ],
};
