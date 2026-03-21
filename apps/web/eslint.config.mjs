import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    ".turbo/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    "../../.vs/**",
    "logs/**",
  ]),
]);

export default eslintConfig;
