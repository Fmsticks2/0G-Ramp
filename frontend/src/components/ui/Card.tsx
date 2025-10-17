import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
}

export default function Card({ padded = false, className = '', children, ...props }: CardProps) {
  const classes = ['card', padded ? 'padded' : '', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}