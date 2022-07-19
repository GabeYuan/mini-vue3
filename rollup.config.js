import tsPlugin from "@rollup/plugin-typescript"
export default {
    input: './src/index.ts',
    output: [
        {
            format: 'cjs',
            file: 'lib/i-mini-vue.cjs.js',
        },
        {
            format: 'es',
            file: 'lib/i-mini-vue.esm.js',
        },
    ],
    plugins: [tsPlugin()],
}
