import nodent from "rollup-plugin-nodent";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";
import gzipPlugin from "rollup-plugin-gzip";
import sizes from "rollup-plugin-sizes";

const libName = "autoCompleteJS";

export default [
  {
    input: "src/autoComplete.js",
    output: {
      file: pkg.browser,
      name: libName,
      format: "umd",
    },
    plugins: [
      nodent({ promises: true, noRuntime: true, es6target: true }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      uglify({
        compress: {
          toplevel: true,
          drop_console: true,
        },
      }),
      gzipPlugin(),
    ],
  },
  {
    input: "src/autoComplete.js",
    output: {
      file: pkg.main,
      name: libName,
      format: "umd",
    },
    plugins: [
      nodent({ promises: true, noRuntime: true, es6target: true }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      cleanup(),
      gzipPlugin(),
      sizes(),
    ],
  },
];
