// pages/index.js
import StatusWidget from '../components/StatusWidget'
import { CONFIG } from './config'

if (!CONFIG.srv) {
  var SERVER_IP = `${CONFIG.server}:${CONFIG.port}`
} else {
  var SERVER_IP = CONFIG.server
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
    const serverData = await res.json()
    return { props: { serverData } }
  } catch (error) {
    return { props: { serverData: null } }
  }
}

export default function Home({ serverData }) {
  return (
    <div className="root-container">
      <StatusWidget serverData={serverData} />
    </div>
  )
}
