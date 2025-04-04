import { useState, useEffect } from 'react'
import styles from './StatusWidget.module.css' // 关键修改点

const StatusWidget = () => {
  const [serverData, setServerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER || 'mc.neotec.uk'

  // 保持原有数据获取逻辑不变
  useEffect(() => {
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
  }, [])

  if (loading) {
    return <div className={styles.loading}>加载中...</div>
  }

  return (
    <div className={styles.container}>
      <h2>服务器状态</h2>
      <div className={styles.statusBox}>
        {serverData?.icon && (
          <img
            src={serverData.icon}
            className={styles.serverIcon}
            alt="服务器图标"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}
        <div
          className={`${styles.statusIndicator} ${
            serverData?.online ? styles.online : styles.offline
          }`}
        />
        <div className={styles.details}>
          <p>地址: <span>{serverData?.hostname || '-'}</span></p>
          <p>版本: <span>{serverData?.version || '-'}</span></p>
          <p>玩家: <span>
            {serverData?.players 
              ? `${serverData.players.online}/${serverData.players.max}`
              : '-'}
          </span></p>
          <p>描述: <span>
            {serverData?.motd?.clean?.join(' ') || '服务器当前离线'}
          </span></p>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget
