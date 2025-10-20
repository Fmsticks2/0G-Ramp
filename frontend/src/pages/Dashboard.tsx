import Layout from '../components/Layout'
import OnRampWidget from '../components/OnRampWidget'
import OffRampWidget from '../components/OffRampWidget'
import ContractInfo from '../components/ContractInfo'

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OnRampWidget />
        <OffRampWidget />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ContractInfo />
      </div>
    </Layout>
  )
}