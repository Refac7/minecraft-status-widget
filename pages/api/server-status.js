// pages/api/server-status.js
export default async (req, res) => {
  // 1. 获取服务器状态
  const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER;
  const apiRes = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
  const data = await apiRes.json();

  // 2. 生成动态 SVG
  const svgContent = `
    <svg width="300" height="180" viewBox="0 0 300 180" 
         xmlns="http://www.w3.org/2000/svg" 
         style="background:transparent; font-family:-apple-system, BlinkMacSystemFont, sans-serif">
      <!-- 状态指示灯 -->
      <circle cx="270" cy="20" r="8" fill="${data.online ? '#4CAF50' : '#f44336'}"/>
      
      <!-- 服务器图标 -->
      ${data.icon ? `
        <image href="${data.icon}" x="20" y="20" width="60" height="60"/>
      ` : ''}
      
      <!-- 文字信息 -->
      <text x="100" y="40" font-size="14" fill="currentColor">
        <tspan x="100" dy="0">地址: ${data.hostname || '-'}</tspan>
        <tspan x="100" dy="20">版本: ${data.version || '-'}</tspan>
        <tspan x="100" dy="20">玩家: ${data.players?.online || 0}/${data.players?.max || 0}</tspan>
        <tspan x="100" dy="20">描述: ${data.motd?.clean?.join(' ') || '离线'}</tspan>
      </text>
    </svg>
  `;

  // 3. 返回 SVG 响应
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, max-age=0');
  res.send(svgContent);
};
