type Props = {
  title: string
  value: string | number
  hint?: string
}

export default function StatCard({ title, value, hint }: Props) {
  return (
    <div className="card stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {hint && <div className="stat-hint">{hint}</div>}
    </div>
  )
}