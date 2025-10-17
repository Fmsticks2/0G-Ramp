type Props = { variant?: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }

export default function Badge({ variant = 'info', children }: Props) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}