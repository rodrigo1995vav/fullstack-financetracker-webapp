import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { getTransactions} from '../../../services/apiServices'

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    (p[0].split("")[0] === "-" ? "-" : "") +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}




export const Balance = () => {
  const { auth, setAuth } = useAuth();

  const [ expense, setExpense] = useState(0)

  const [ income, setIncome ] = useState(0)

  const [ currentBalance, setCurrentBalance] = useState(0)


  useEffect(() => {
    totalBalance()
  },[])

  const totalBalance = async() => {
  
    const data = await getTransactions(auth.token)
    const allOperations = data.data.data
    let tempExpense = 0
    let tempIncome = 0
    console.log(allOperations)
    allOperations.map(op => {
      if (op.type === "Expense") tempExpense += op.amount 
      if (op.type === "Income") tempIncome += op.amount
    })
    setCurrentBalance(tempIncome-tempExpense)
    setExpense(tempExpense)

  
  }

  return (
    <div>
      
      <div>
      <h1>Your Balancess = {moneyFormatter(currentBalance)}</h1>
      </div>
      <div></div>
      <div></div>
    </div>
    
  );
};
