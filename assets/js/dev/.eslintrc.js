//This .eslintrc.js is for assets/dev/**/*.js which are only used in browser
module.exports = {
  "env": {
    "browser": true,
    "commonjs": false,
    "es6": false,
    "jquery": true,
    "node": false
  },
  "extends": "eslint:recommended",
  "globals": {
    "Modernizr": true,
    "Vue": true,
    "grecaptcha": true,
    "responsiveNav": true
  },
  "rules": {
    "indent": [ "error", 2 ],
    "linebreak-style": [ "error", "unix" ],
    "max-len": ["error", { "code": 120 }],
    "no-console": "off",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-sparse-arrays": "error",
    "no-unexpected-multiline": "error",
    "quotes": [ "error", "single" ],
    "semi": [ "error", "always" ],
    "use-isnan": "error",
    "valid-typeof": "error"
  }
};
