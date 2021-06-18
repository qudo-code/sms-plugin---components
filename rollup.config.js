import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

export default {
    input : "./src/index.js",

    plugins : [
        resolve({
            browser : false,
        }),
        commonjs(),
        terser(),
    ],

    output : [
        {
            file   : pkg.module,
            format : "es",
        },
        {
            file   : pkg.main,
            format : "cjs",
            name   : pkg.nam,
        },
    ],
}