const isBuild = process.env.npm_lifecycle_event === 'build';
module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "import/extensions": 0,
        "comma-dangle": 0,
        "space-before-blocks": 0,
        "indent": ["error", 4],
        "func-names": 0,
        "no-unused-vars": 0,
        "import/first": 0,
        "eol-last": 0,
        "no-plusplus": 0,
        "no-param-reassign": 0,
        "no-debugger": isBuild ? 2 : 0,
        "no-console": isBuild ? 2 : 0,
        "no-alert": isBuild ? 2 : 0
    }
}