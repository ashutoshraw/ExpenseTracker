import React from 'react'

export default function CustomInput({label,className,id,name,value,onChange,error}) {
  return (
    <div className={className}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange} 
    />
  <p className="error">{error}</p>
  </div>
  )
}
