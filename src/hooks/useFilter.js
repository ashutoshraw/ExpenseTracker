import React, { useState } from 'react'

export function useFilter(dataList,callback) {
    const[query,setQuery]=useState('')
   const filteredData= dataList.filter((data)=>callback(data).includes(query)
    )
return [filteredData,setQuery]
}
