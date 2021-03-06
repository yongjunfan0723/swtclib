// import fs from "fs"
import path from "path"
import ts from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

const path_resolve = (...p) => path.resolve(...p)
const name = "wallet"

// const knownExternals = fs.readdirSync(resolve(".."))
// ensure TS checks only once for each build
let hasTSChecked = false

export default [
  {
    input: path_resolve("tssrc", "index.ts"),
    external: [
      // "base-x",
      // "crypto",
      // "hash.js",
      "bn.js",
      "brorand",
      "elliptic",
      "inherits",
      "@swtc/address-codec",
      "@swtc/common",
      "@swtc/keypairs"
    ],
    plugins: [ts(), json(), resolve({ preferBuiltins: false }), commonjs()],
    output: [
      {
        file: path_resolve("dist", `${name}.esm.prod.js`),
        plugins: [terser()],
        format: "es"
      },
      {
        file: path_resolve("dist", `${name}.esm.js`),
        format: "es"
      }
    ]
  },
  {
    input: path_resolve("tssrc", "index.ts"),
    external: [
      // "base-x",
      // "crypto",
      // "hash.js",
      "bn.js",
      "brorand",
      "elliptic",
      "inherits",
      "@swtc/address-codec",
      "@swtc/common",
      "@swtc/keypairs"
    ],
    // plugins: [ts()],
    plugins: [ts(), json(), resolve({ preferBuiltins: false }), commonjs()],
    output: [
      {
        file: path_resolve("dist", `${name}.cjs.prod.js`),
        plugins: [terser()],
        format: "cjs"
      },
      {
        file: path_resolve("dist", `${name}.cjs.js`),
        format: "cjs"
      }
    ]
  }
]
