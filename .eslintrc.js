//This .eslintrc.js is for ./*.js which are only used in nodejs
//* Example: `gulpfile.js`, `proofScripts.js`
//Note: `assets/dev/.eslintrc.js` is for js targeting the browser
module.exports = {
  "env": {
    "browser": false,
    "commonjs": true,
    "es6": true,
    "jquery": false,
    "node": true,
    "shelljs": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "arrow-parens": "off", //es6
    "indent": [ "error", 2 ],
    "linebreak-style": [ "error", "unix" ],
    "max-len": ["error", { "code": 120 }],
    "no-console": "off",
    "no-control-regex": "error",
    "no-debugger": "warn",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-sparse-arrays": "error",
    "no-unexpected-multiline": "error",
    "no-var": "off", //es6
    "prefer-const": "off", //es6
    "quotes": [ "error", "single" ],
    "semi": [ "error", "always" ],
    "use-isnan": "error",
    "valid-typeof": "error"
  }
};
