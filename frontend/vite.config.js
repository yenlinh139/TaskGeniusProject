/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    base: env.VITE_ROUTER_BASE_URL || '/',
    define: {
      'import.meta.env': env,
      optimizeDeps: {
        exclude: ['js-big-decimal']
      }
    }
  })
}
