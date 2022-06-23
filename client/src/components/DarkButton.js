import React from 'react'
import '../css/coolbutton.css'

export default function DarkButton({children, ...props}) {
  return (
    <button className="dark-button" {...props}>{children}</button>
  )
}