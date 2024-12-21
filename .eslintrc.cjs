module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'import'],
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@context', './src/context'],
          ['@features', './src/features'],
          ['@pages', './src/pages'],
          ['@store', './src/store'],
          ['@services', './src/services'],
          ['@helpers', './src/helpers'],
          ['@hooks', './src/hooks'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {},
};
