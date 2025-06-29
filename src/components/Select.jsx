import React from 'react'

export default function Select({label,id,name,value,onChange,options,error,defaultOption}) {
  return (
    <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
    {
        defaultOption&& <option value="hidden">{defaultOption}</option>
    }
      {
        options.map((element,i)=>{
return <option value={element} key={i}>{element}</option>
        })
      }
    </select>
    <p className="error">{error}</p>
  </div>
  )
}
