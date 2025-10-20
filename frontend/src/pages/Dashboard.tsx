import Layout from '../components/Layout'
import OnRampWidget from '../components/OnRampWidget'
import OffRampWidget from '../components/OffRampWidget'

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OnRampWidget />
        <OffRampWidget />
      </div>
    </Layout>
  )
}