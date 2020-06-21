module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "extends:airbnb",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "curly": [
            2,
            "all"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ],
        "eqeqeq": [
            2,
            "smart"
        ],
        "one-var-declaration-per-line": [
            2,
            "always"
        ],

        //cli3
        "new-cap": 2,
        "no-case-declarations": 0,
        "react/jsx-one-expression-per-line": "off",
        "arrow-body-style": "off",
        "no-unused-expressions": "off",
        "react/jsx-props-no-spreading": "off",
        "jsx-a11y/tabindex-no-positive": "off",
    
        "no-set-state": "off",
        "react/no-multi-comp": [1, { "ignoreStateless": true }],
        "indent": [2, 2, { "SwitchCase": 1 }],
        "linebreak-style": [2, "unix"],
        "quotes": [2, "single", { "allowTemplateLiterals": true }],
        "semi": [2, "never"],
        "comma-dangle": [2, "never"],
        "no-cond-assign": [2, "always"],
        "no-console": 0,
        "react/prop-types": 0,
        "max-len": [
          2,
          {
            "code": 360,
            "tabWidth": 2,
            "ignoreUrls": true
          }
        ],
        "function-paren-newline": [2, "consistent"],
        "standard/no-callback-literal": 0,
        "jsx-quotes": [2, "prefer-single"],
        "space-before-function-paren": [
          2,
          { "anonymous": "always", "named": "always", "asyncArrow": "always" }
        ],
        "react/display-name": [0, { "ignoreTranspilerName": false }],
        "react/no-unescaped-entities": [2, { "forbid": ["\""] }],
        "lines-between-class-members": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/no-array-index-key": "off",
        "eol-last": "off",
        "react/destructuring-assignment": "off",
        "no-param-reassign": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "import/prefer-default-export": "off",
        "no-return-assign": "off",
        "import/no-extraneous-dependencies": "off",
        "react/no-unused-state": "off",
        "max-classes-per-file": ["error", 2],
        "no-trailing-spaces": "off",
        "arrow-parens": "off",
        "consistent-return": "off",
        "no-else-return": "off",
        "no-extra-boolean-cast": "off",
        "no-lonely-if": "off",
        "prefer-const": "off",
        "no-plusplus": "off",
        "import/no-unresolved": "off",
        "object-curly-newline": "off",
        "no-confusing-arrow": "off",
        "react/jsx-curly-brace-presence": "off",
        "no-nested-ternary": "off",
        "no-underscore-dangle": "off",
        "no-restricted-syntax": "off"
    }
};
