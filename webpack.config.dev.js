const Dat = require('dat-node')
const path = require('path')
const webpack = require('webpack')

const tmppath = path.resolve(__dirname, 'tmp')

module.exports = {
  ...require('./webpack.config'),
  output: {
    path: tmppath,
    publicPath: '/',
    filename: './dat-medium.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment/min/moment.min.js',
      markdownIt: 'markdown-it/dist/markdown-it.min.js',
    }),
  ],
}

const launchDat = () =>
  Dat(tmppath, (err, dat) => {
    if (err) throw err
    dat.importFiles({ watch: true })
    dat.joinNetwork()
    console.log(`dat://${dat.key.toString('hex')}`)
  })

setTimeout(launchDat, 5000)
