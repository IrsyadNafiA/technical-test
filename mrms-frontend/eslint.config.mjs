import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(...mantine, { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] });

module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Nonaktifkan aturan untuk semua pernyataan console
  },
};
