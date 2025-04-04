// components/StatusWidget.js
import { useState, useEffect } from 'react'
import styles from './StatusWidget.module.css'

const StatusWidget = ({ serverData: initialData }) => {
  const [serverData, setServerData] = useState(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER || 'mc.neotec.uk'

  // 客户端数据刷新
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
          const data = await response.json()
          setServerData(data)
        } catch (error) {
          console.error('API请求失败:', error)
        } finally {
          setLoading(false)
        }
      }
      
      fetchData()
      const interval = setInterval(fetchData, 60000)
      return () => clearInterval(interval)
    }
  }, [SERVER_IP, initialData])

  // 安全访问数据
  const safeData = serverData || {}
  const isOnline = safeData.online || false

  if (loading) {
    return <div className={styles.loading}>加载中...</div>
  }

  return (
    <div className={styles.container}>
      <h2>服务器状态</h2>
      <div className={styles.statusBox}>
        {safeData.icon && (
          <img
            src={safeData.icon}
            className={styles.serverIcon}
            alt="服务器图标"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}
        <div className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`} />
        <div className={styles.details}>
          <p>地址: <span>{safeData.hostname || '-'}</span></p>
          <p>版本: <span>{safeData.version || '-'}</span></p>
          <p>玩家: <span>
            {safeData.players 
              ? `${safeData.players.online}/${safeData.players.max}`
              : '-'}
          </span></p>
          <p>描述: <span>
            {safeData.motd?.clean?.join(' ') || '服务器当前离线'}
          </span></p>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget