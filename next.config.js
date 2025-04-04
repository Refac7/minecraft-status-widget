// 严格保留原有配置逻辑，仅补充CSS处理
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  webpack: (config) => {
    // 添加CSS Modules支持
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    })

    // 保留全局CSS处理
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader']
    })

    return config
  }
}
