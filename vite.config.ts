import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.build.json',
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./test/setup.ts",
    },
    build: {
        lib: {
            entry: {
                index: 'src/index.ts',
                'date-picker': 'src/date-picker/index.ts',
            },
            formats: ['es'],
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
