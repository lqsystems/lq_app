module.exports = {
  // This line might interfere with HMR (according to github issue it came from)
  chainWebpack: config => config.resolve.symlinks(false),
  devServer: {
    disableHostCheck: true,
  },
  publicPath: './',
};
