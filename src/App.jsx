import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { useLocalStorage } from "./hooks/useLocalStorage";
import expenseData from "../expenseData";

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData);

  const [expense,setExpense] = useLocalStorage('expense',{
    title: "",
    category: "",
    amount: "",
  });
  const [editingRowId, setEditingRowId] = useState("");

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          />
         
        </div>
      </main>
    </>
  );
}

export default App;
