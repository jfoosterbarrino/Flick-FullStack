import React from 'react'
import '../css/coolbutton.css'

export default function RedButton({children, ...props}) {
  return (
    <button className="red-button" {...props}>{children}</button>
  )
}