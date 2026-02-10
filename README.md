# Minecraft 服务器状态实时显示解决方案

本项目使用 `npm` 包管理器

## 项目背景

我在使用 tangly1024 的 NotionNext 框架于 Vercel 上构建静态博客时，遇到了一个需求：希望实时显示 Minecraft 服务器的运行状态。

最初尝试的方案：
1. 使用 mcstatus.io 的 SVG widget 服务
   - 问题：嵌入 Notion 数据库后不会自动更新，仅初次加载时刷新
2. 尝试嵌入 CodePen 和 CodeSandbox 的网页
   - 问题：界面组件杂乱，与博客风格不协调

最终解决方案：基于 React 开发了独立的 Vercel 应用，通过 URL 嵌入状态页面，无需修改网站源码。

## 效果展示

<center class='img'>
    <img title="v1.1.0" src="https://github.com/user-attachments/assets/fbbb038c-5e09-4646-b0f5-ac3669f92f15" width="30%">
    <img title="v2.1.0" src="https://github.com/user-attachments/assets/a8f92fb0-26f6-47eb-bf43-50dc45aef377" width="55%">
</center>

## 使用指南

### 快速开始
1. 复刻此仓库到您的 GitHub 账户
2. 修改配置文件：
   - 找到 `/src/config.ts`
   - 将 `根据指引填写信息`
3. 部署到 Vercel（部署方法请自行搜索）
4. 将生成的网址嵌入到您的网页中（使用标准Markdown）

## 许可证
本项目采用 [MIT License](https://opensource.org/licenses/MIT)。