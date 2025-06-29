import React, { useRef, useState } from "react";
import CustomInput from "./CustomInput";
import Select from "./Select";
export default function ExpenseForm({setExpenses ,expense,setExpense,editingRowId,setEditingRowId}) {
 
  const handleChange = (e) => {
const{name,value}=e.target

setExpense((prevState)=>({...prevState,[name]:value}))
    setErrors({});
  }
  const [errors, setErrors] = useState({});
const validationConfig={
  title:[{required:true,message:'Please enter the title'},{minLength:2,message:'title should be at least 4 characters long'}],
  category:[{required:true,message:'please select a category'}],
  amount:[{required:true,message:'Please enter an amount'},{pattern:/^[1-9]\d(\.\d+)?$/,message:'please enter a valid number'}]
}
  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key,value])=>{
      
   validationConfig[key].some((rule)=>{
    if(rule.required&&!value){
      errorsData[key]=rule.message
      return true
    }
    if(rule.minLength&&value.length<rule.minLength){
errorsData[key]=rule.message
return true
    }
    if(rule.pattern&&!rule.pattern.test(value)){
      errorsData[key]=rule.message
      return true
    }
   })
    })
    setErrors(errorsData);
    return errorsData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult= validate(expense);
    if (Object.keys(validateResult).length) return;

    if(editingRowId){
      setExpenses((prevState)=>
        prevState.map((previousExpense)=>{
          if(previousExpense.id===editingRowId){
return {...expense,id:editingRowId}
          }
          return previousExpense
        })
      )
      setEditingRowId('')
      setExpense({ title: "", category: "", amount: "" });
      return
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({ title: "", category: "", amount: "" });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <CustomInput
        className="input-container"
        label="Title"
        id="title"
        value={expense.title}
        name="title"
        onChange={handleChange}
        error={errors.title}
      />

      <Select
      label='Category'
        id="category"
        name="category"
        value={expense.category}
        
        onChange={handleChange}
        error={errors.category}
        defaultOption='select category'
        options={['All','Bills','Clothes','Education','Grocery','Medicine']}
      />
      <CustomInput
        className="input-container"
        label="Amount"
        id="amount"
        value={expense.amount}
        name="amount"
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId?'Save':'Add'}</button>
    </form>
  );
}
