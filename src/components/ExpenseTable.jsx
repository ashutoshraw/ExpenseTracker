import React, { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  expenses,
  setExpenses,
  setExpense,
  setEditingRowId,
}) {
  const [filteredData,setQuery] = useFilter(expenses,(data) =>data.category);
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const[sortCallback,setSortCallback]=useState(()=>()=>{})
  
  
  //  const addAmount=(amountArray)=>{
  //   let add=0
  //   for(let i=0;i<amountArray.length;i++){
  // add=add+amountArray[i]
  //   }
  //   return add
  //  }
  //  const totalAmount=filteredData.map(({amount})=>amount)
  // console.log( addAmount(totalAmount));

  const Total = filteredData.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  );
  return (
    <>
    <div>
      <ContextMenu
        menuPosition={menuPosition}
        setExpenses={setExpenses}
        setMenuPosition={setMenuPosition}
        rowId={rowId}
        setExpense={setExpense}
        expenses={expenses}
        setEditingRowId={setEditingRowId}
      />
      <table className="expense-table" onClick={() =>{
        if(menuPosition.left){
          setMenuPosition({})
        }
      }}>
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a,b)=>a.title.localeCompare(b.title))
                  
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a,b)=>b.title.localeCompare(a.title))
                  
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select onChange={(e) => {
                setQuery(e.target.value)
              }
            }>
                <option value="">All</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option
                  value="
            Medicine"
                >
                  Medicine
                </option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a,b)=>a.amount-b.amount)
                  
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a,b)=>b.amount-a.amount)
                  
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.sort(sortCallback).map(({ title, category, amount, id }) => {
            return (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({ left: e.clientX, top: e.clientY });
                  setRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th className="clear-sort" onClick={()=>setSortCallback(()=>{})}>Clear Sort</th>
            <th>₹{Total}</th>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}
