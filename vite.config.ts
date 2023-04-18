import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: 'src/index.ts',
                'date-picker': 'src/date-picker/index.ts',
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'react-hook-form',
                '@mui/material',
                '@mui/x-date-pickers',
            ],
        },
    },
});
