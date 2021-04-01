import nodent from "rollup-plugin-nodent";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import gzipPlugin from "rollup-plugin-gzip";
import analyze from "rollup-plugin-analyzer";
import sizes from "rollup-plugin-sizes";
import serve from "rollup-plugin-serve";
// import livereload from "rollup-plugin-livereload";

// Library Name
const libName = "autoComplete";
// Library Max. Size Allowed
const limitBytes = 3 * 1024 * 1024;
// Library Size Analyzer
const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return;
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
  return process.exit(1);
};

// Rollup Config.
export default [
  {
    input: "src/autoComplete.js",
    output: {
      file: pkg.browser,
      name: libName,
      format: "umd",
    },
    plugins: [
      nodent({
        es7: true,
        promises: true,
        sourcemap: true,
        noRuntime: true,
        es6target: true,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      cleanup(),
      terser({
        compress: {
          drop_console: true,
        },
        toplevel: true,
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
      nodent({
        es7: true,
        promises: true,
        sourcemap: true,
        noRuntime: true,
        es6target: true,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      cleanup(),
      gzipPlugin(),
      // Analyzer
      analyze({
        onAnalysis,
        summaryOnly: true,
        showExports: true,
      }),
      sizes(),
      // Server
      serve({
        open: true,
        openPage: "/index.html",
        host: "localhost",
        port: 8000,
        verbose: true,
        contentBase: "./dist",
      }),
      // // Live Reload
      // livereload({ watch: "./dist" }),
    ],
  },
];
