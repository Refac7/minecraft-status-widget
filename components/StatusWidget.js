import { useState, useEffect } from 'react'

const StatusWidget = () => {
  const [serverData, setServerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER || 'mc.neotec.uk'

  const fetchServerStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
      if (!response.ok) throw new Error('API请求失败')
      const data = await response.json()
      setServerData(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 立即获取初始数据
    fetchServerStatus()

    // 设置定时器每60秒刷新
    const interval = setInterval(fetchServerStatus, 60000)

    // 5分钟强制页面刷新（可选）
    const forceRefreshTimer = setInterval(() => {
      window.location.reload()
    }, 300000)

    return () => {
      clearInterval(interval)
      clearInterval(forceRefreshTimer)
    }
  }, [])

  if (loading) {
    return (
      <div className="widget-container">
        <div className="loading">加载服务器状态中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="widget-container error">
        <h2>⚠️ 连接错误</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="widget-container">
      <h2>🟩 服务器状态</h2>
      <div className="status-box">
        {serverData?.icon && (
          <img 
            src={serverData.icon}
            alt="服务器图标"
            className="server-icon"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div 
          className={`status-indicator ${
            serverData?.online ? 'online' : 'offline'
          }`}
        />
        <div className="details">
          <p>🌐 地址: <span>{serverData?.hostname || '-'}</span></p>
          <p>🔖 版本: <span>{serverData?.version || '-'}</span></p>
          <p>👥 玩家: <span>
            {serverData?.players 
              ? `${serverData.players.online}/${serverData.players.max}`
              : '-'}
          </span></p>
          <p>📝 描述: <span>
            {serverData?.motd?.clean?.join(' ') || '服务器当前离线'}
          </span></p>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget