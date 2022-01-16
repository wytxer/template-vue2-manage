const project = require('./build/project.config')

const config = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: []
}

// 如果是私有化项目，自动设置为按需加载
if (project.client.env.IS_PRIVATE) {
  config.plugins.push([
    'import', {
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: true
    }
  ])
}

module.exports = config
