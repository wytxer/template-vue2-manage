const config = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: []
}

// 如果是私有云部署或者预览环境，自动设置为按需加载
if (process.env.VUE_APP_PRIVATE === 'true' || process.env.VUE_APP_BUILD_ENV === 'preview') {
  config.plugins.push([
    'import', {
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: true
    }
  ])
}

module.exports = config
