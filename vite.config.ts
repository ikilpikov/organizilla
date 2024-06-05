import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            assets: '/src/assets',
            components: '/src/components',
            constants: '/src/constants',
            context: '/src/context',
            hooks: '/src/hooks',
            services: '/src/services',
            pages: '/src/pages',
            schemas: '/src/schemas',
            store: '/src/store',
            types: '/src/types',
            utils: '/src/utils',
        },
    },
});
