module.exports = {
    // testEnvironment: "jsdom", JSDOM je default
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
        '\\.css$': require.resolve('./test/style-mock'),
    },
    // JSDOM nepodporuje localStorage, je nutné vytvořit soubor, který se spustí dřív než testy a který "dodá" localStorage do prostředí
    setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
    // whitelist souborů, které se dostanou do --coverage
    // pokud zvolím pouze src složku, zbavím coverage toho, že bude započítávat do statistiky i soubory, které jsou spojené
    // s testováním (např. setup-test-framework.js)
    collectCoverageFrom: [
        '**/src/**/*.js'
    ],
    // určuje hranici, pod kterou bych se s code coverage neměl dostat
    coverageThreshold: {
        global: {
            statements: 18,
            branches: 10,
            functions: 19,
            lines: 18,
        },
    },
};