import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import cleanup from "rollup-plugin-cleanup";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";
import gzipPlugin from "rollup-plugin-gzip";

export default [
  {
    input: "src/models/autoComplete.js",
    output: {
      file: pkg.browser,
      name: "autoComplete",
      format: "umd"
    },
    plugins: [
      eslint(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"]
      }),
      uglify({
        compress: {
          toplevel: true,
          drop_console: true
        }
      }),
      gzipPlugin()
    ]
  },
  {
    input: "src/models/autoComplete.js",
    output: {
      file: pkg.main,
      name: "autoComplete",
      format: "umd"
    },
    plugins: [
      eslint(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"]
      }),
      cleanup(),
      gzipPlugin()
    ]
  }
];
