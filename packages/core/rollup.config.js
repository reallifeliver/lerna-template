import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    image(),
    postcss({
      modules: true,
    }),
    babel({ extensions, include: ['src/**/*'], babelHelpers: 'runtime' }),
    terser({
      keep_classnames: true,
      keep_fnames: true,
    }), // minify
  ],
};
