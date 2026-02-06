import { useState, useEffect } from 'react'
import styles from './StatusWidget.module.css'
import { CONFIG } from '../src/config'

const StatusWidget = ({ serverData: initialData }) => {
  const [serverData, setServerData] = useState(initialData || null)
  const [loading, setLoading] = useState(!initialData)

  if (!CONFIG.srv) {
    var SERVER_IP = `${CONFIG.server}:${CONFIG.port}`
  } else {
    var SERVER_IP = CONFIG.server
  }

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

  const safeData = serverData || {}
  const isOnline = safeData.online || false

  if (loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingSpinner} />
        加载服务器数据...
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>服务器状态</h2>
        <div className={`${styles.statusBadge} ${isOnline ? styles.online : styles.offline}`}>
          {isOnline ? '在线' : '离线'}
        </div>
      </div>
      
      <div className={styles.statusBox}>
        {safeData.icon && (
          <img
            src={safeData.icon}
            className={styles.serverIcon}
            alt="服务器图标"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}
        
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>服务器地址:</span>
            <span className={styles.detailValue}>{SERVER_IP || '-'}</span>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>游戏版本:</span>
            <span className={styles.detailValue}>{safeData.version || '-'}</span>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>在线玩家:</span>
            <span className={`${styles.detailValue} ${styles.playersCount}`}>
              {safeData.players 
                ? `${safeData.players.online}/${safeData.players.max}`
                : '-'}
            </span>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>服务器描述:</span>
            <span className={styles.detailValue}>
              {safeData.motd?.clean?.join(' ') || '服务器当前离线'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget