type Props = { title: string; subtitle?: string; right?: React.ReactNode }

export default function SectionHeader({ title, subtitle, right }: Props) {
  return (
    <div className="section-header">
      <div>
        <div className="section-title">{title}</div>
        {subtitle && <div className="section-subtitle">{subtitle}</div>}
      </div>
      {right && <div className="section-actions">{right}</div>}
    </div>
  )
}