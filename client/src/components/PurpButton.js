import React from 'react'
import '../css/coolbutton.css'

export default function PurpButton({children, ...props}) {
  return (
    <button className="purp-button" {...props}>{children}</button>
  )
}