import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'src/public/bundle.js'
  },
  plugins: [
    commonjs()
  ]
}