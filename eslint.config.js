import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  { rules: { "semi": ["error", "never"] } },
])