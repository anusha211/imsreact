export const verbose = true;
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const coverageThreshold = {
    global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
    }
};
export const collectCoverageFrom = ['src/**/*.{js,jsx,ts,tsx}','!src/reportWebVitals.ts'];
export const coveragePathIgnorePatterns = '/src/reportWebVitals.ts';


  