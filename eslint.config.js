// Simple ESLint configuration for MVP
export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // TypeScript handles this better
    },
  },
];