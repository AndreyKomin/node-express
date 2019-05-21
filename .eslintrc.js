// https://github.com/mysticatea/eslint-plugin-node
var path = require('path');

module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-base",
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "env": {
    "node": true,
  },
  "rules": {
    "node/exports-style": ["error", "module.exports"],
    "node/prefer-global/buffer": ["error", "always"],
    "node/prefer-global/console": ["error", "always"],
    "node/prefer-global/process": ["error", "always"],
    "node/prefer-global/url-search-params": ["error", "always"],
    "node/prefer-global/url": ["error", "always"],
    "node/prefer-promises/dns": "error",
    "node/prefer-promises/fs": "error",
    "node/no-unsupported-features/node-builtins": "error",
    "node/no-unsupported-features/es-syntax": ["error", {
      "version": ">=10.15.3",
      "ignores": ['modules']
    }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["./"]
      }
    }
  }
};
