import pkg from "./package.json" with { type: "json" };
import gzipPlugin from "rollup-plugin-gzip";
import analyze from "rollup-plugin-analyzer";
import sizes from "rollup-plugin-sizes";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import swc from "@rollup/plugin-swc";

// Library Name
const libName = "autoComplete";
// Build Environment
const isProduction = process.env.NODE_ENV === "production";
// Library Max. Size Allowed
const limitBytes = 3 * 1024 * 1024;
// Library Size Analyzer
let analyzePluginIterations = 0;
const onAnalysis = ({ bundleSize }) => {
  if (analyzePluginIterations > 0) {
    throw ""; // We only want reports on the first output
  }
  analyzePluginIterations++;
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
        format: "es",
      },
      {
        file: "./docs/demo/js/autoComplete.min.js",
        name: libName,
        format: "es",
        // sourcemap: isProduction ? false : "inline",
      },
    ],
    plugins: [
      swc({
        swc: {
          jsc: {
            target: "es2022",
          },
          minify: true,
        },
      }),
      gzipPlugin(),
    ],
  },
  {
    input: "src/autoComplete.js",
    output: [
      {
        file: `./${pkg.main}`,
        name: libName,
        format: "es",
      },
      {
        file: "./docs/demo/js/autoComplete.js",
        name: libName,
        format: "es",
        // sourcemap: isProduction ? false : "inline",
      },
    ],
    plugins: [
      swc({
        swc: {
          jsc: {
            target: "es2022",
          },
          minify: false,
        },
      }),
      gzipPlugin(),
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
