import React from 'react'
import '../css/coolbutton.css'

export default function BlueButton({children, ...props}) {
  return (
    <button className="blue-button" {...props}>{children}</button>
  )
}