import React from 'react'
import '../css/coolbutton.css'

export default function CoolButton({children, ...props}) {
  return (
    <button className="cool-button" {...props}>{children}</button>
  )
}
