module.exports = {
    extends: "@dolittle/typescript",
    root: true,
    parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname
    },
    rules: {
        'no-restricted-globals': 'off',
        'no-empty': 'off'
    },
    overrides: [
        {
            files: ['**/for_*/**'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['Source/rules/**'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['**/for_*/**'],
            rules: {
                '@typescript-eslint/no-unused-expressions': 'off',
            },
        },
        {
            files: ['**/for_*/**'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
