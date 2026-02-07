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
          console.error('Data_Fetch_Error:', error)
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

  // 计算玩家百分比用于进度条
  const playerPercent = safeData.players 
    ? Math.min((safeData.players.online / safeData.players.max) * 100, 100) 
    : 0;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.blink}>_</span> SYSTEM_INITIALIZING...
        </div>
      </div>
    )
  }

  return (
    <div className={styles.rootContainer}>
      {/* 顶部状态栏 - 模仿控制台头部 */}
      <div className={`${styles.header} ${isOnline ? styles.headerOnline : styles.headerOffline}`}>
        <div className={styles.headerTitle}>
          <span className={styles.icon}>#</span>
          MC_SERVER_STATUS
        </div>
        <div className={styles.statusIndicator}>
          <span className={styles.statusText}>{isOnline ? 'SYS: ONLINE' : 'SYS: OFFLINE'}</span>
          <div className={`${styles.statusLight} ${isOnline ? styles.lightGreen : styles.lightRed}`}></div>
        </div>
      </div>
      
      <div className={styles.mainGrid}>
        {/* 左侧：图标与基础信息 */}
        <div className={styles.leftPanel}>
          <div className={styles.iconWrapper}>
            {safeData.icon ? (
              <img
                src={safeData.icon}
                className={styles.serverIcon}
                alt="ICON"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              <div className={styles.placeholderIcon}>NO_IMG</div>
            )}
            {/* 角落装饰 */}
            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerBottomRight}></div>
          </div>
          
          <div className={styles.metaBlock}>
             <span className={styles.label}>// TARGET_IP</span>
             <span className={styles.value}>{SERVER_IP}</span>
          </div>
        </div>

        {/* 右侧：详细数据表格 */}
        <div className={styles.rightPanel}>
          
          {/* 版本信息 */}
          <div className={styles.dataRow}>
            <span className={styles.label}>VERSION_BUILD</span>
            <span className={styles.value}>{safeData.version || 'UNKNOWN'}</span>
          </div>

          {/* 玩家在线状态 - 能量条风格 */}
          <div className={styles.dataRow}>
            <div className={styles.flexBetween}>
                <span className={styles.label}>ACTIVE_USERS</span>
                <span className={styles.value}>
                    {safeData.players ? `${safeData.players.online}/${safeData.players.max}` : '0/0'}
                </span>
            </div>
            <div className={styles.progressBarBg}>
                <div 
                    className={styles.progressBarFill} 
                    style={{ width: `${playerPercent}%` }}
                ></div>
                {/* 扫描线纹理覆盖 */}
                <div className={styles.scanlineOverlay}></div>
            </div>
          </div>

          {/* MOTD - 原始数据风格 */}
          <div className={styles.motdBox}>
            <span className={styles.label}>// MESSAGE_OF_THE_DAY</span>
            <div className={styles.motdContent}>
              {safeData.motd?.clean?.map((line, i) => (
                <div key={i}>{line}</div>
              )) || 'NO_SIGNAL_RECEIVED'}
            </div>
          </div>

        </div>
      </div>
      
      {/* 底部装饰条 */}
      <div className={styles.footer}>
         <span>PING: {isOnline ? 'Active' : 'Timeout'}</span>
         <span>PROTOCOL: TCP/IP</span>
      </div>
    </div>
  )
}

export default StatusWidget