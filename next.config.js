/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // 关键 CSS Modules 配置
  webpack: (config) => {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true, // 自动识别 *.module.css 文件
              localIdentName: '[name]__[local]--[hash:base64:5]' // 生成可读的类名
            }
          }
        }
      ]
    })

    // 允许全局 CSS（用于 globals.css）
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader']
    })

    return config
  }
}

module.exports = nextConfig
