import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { getTransactions } from "../../../services/apiServices";
import './Balance.css'
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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
  const { auth } = useAuth();
  const refresh = useRefreshToken()
  const axiosPrivate = useAxiosPrivate()


  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {

    totalBalance();
  }, []);

  const totalBalance = async () => {
    try {
      console.log(auth);
      const data = await axiosPrivate.get("/transactions")
      const allOperations = await data.data.data;
      let tempExpense = 0;
      let tempIncome = 0;
      console.log(allOperations);
      allOperations.map((op) => {
        if (op.type === "Expense") tempExpense += op.amount;
        if (op.type === "Income") tempIncome += op.amount;
        else tempExpense += op.amount;
      });
      setCurrentBalance(tempIncome - tempExpense);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="container">
      <div className="balance-show">
        <h1>Your Balance = {moneyFormatter(currentBalance)}</h1>
        <button onClick={() => refresh()}>Refresh Token</button>
      </div>
    </div>
  );
};
