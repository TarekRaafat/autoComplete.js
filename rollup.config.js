import nodent from "rollup-plugin-nodent";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };
import gzipPlugin from "rollup-plugin-gzip";
import analyze from "rollup-plugin-analyzer";
import sizes from "rollup-plugin-sizes";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

// Library Name
const libName = "autoComplete";
// Build Environment
const isProduction = process.env.NODE_ENV === "production";
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
    output: [
      {
        file: `./${pkg.browser}`,
        name: libName,
        format: "umd",
      },
      {
        file: "./docs/demo/js/autoComplete.min.js",
        name: libName,
        format: "umd",
        // sourcemap: isProduction ? false : "inline",
      },
    ],
    plugins: [
      nodent({
        es7: true,
        promises: true,
        // sourcemap: isProduction ? false : true,
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
      gzipPlugin.default(),
    ],
  },
  {
    input: "src/autoComplete.js",
    output: [
      {
        file: `./${pkg.main}`,
        name: libName,
        format: "umd",
      },
      {
        file: "./docs/demo/js/autoComplete.js",
        name: libName,
        format: "umd",
        // sourcemap: isProduction ? false : "inline",
      },
    ],
    plugins: [
      nodent({
        es7: true,
        promises: true,
        // sourcemap: isProduction ? false : true,
        noRuntime: true,
        es6target: true,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
      }),
      cleanup(),
      gzipPlugin.default(),
      // Analyzer
      analyze({
        onAnalysis,
        summaryOnly: true,
        showExports: true,
      }),
      sizes(),
      // Server
      !isProduction &&
        serve({
          open: true,
          openPage: "./docs/demo/index.html",
          host: "localhost",
          port: 8000,
          verbose: true,
          contentBase: "./docs/demo",
        }),
      // Live Reload
      !isProduction && livereload({ watch: ["./docs/demo/", "./src/"] }),
    ],
  },
];
