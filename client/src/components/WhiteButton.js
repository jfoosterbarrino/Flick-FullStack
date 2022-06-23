import React from 'react'
import '../css/coolbutton.css'

export default function WhiteButton({children, ...props}) {
  return (
    <button className="white-button" {...props}>{children}</button>
  )
}