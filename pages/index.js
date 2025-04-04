// pages/index.js
import StatusWidget from '../components/StatusWidget'

export async function getServerSideProps() {
  try {
    const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER || 'frp-net.com:46962'
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
