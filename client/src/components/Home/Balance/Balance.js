import React, { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import Box from "@mui/material/Box";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";


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
  const axiosPrivate = useAxiosPrivate();

  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    totalBalance();
  }, []);

  const totalBalance = async () => {
    try {
      console.log(auth);
      const data = await axiosPrivate.get("/transactions");

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
   <Box display="flex" justifyContent="center" padding= "10px" >
    <Card sx={{borderRadius: '10px', minWidth: 275, width: 500,backgroundColor: "#E7FBBE" }} >
      <CardContent>
        <Typography sx={{ fontSize: 25}} variant="h1" gutterBottom align="left" paddingRight="">
          Your Balance
        </Typography>
        <Typography sx={{ marginRight: "10%", marginBottom:"10px"}}variant="h5" component="div" align="right">
        {moneyFormatter(currentBalance)}
        </Typography>
        <Typography sx={{fontSize: 14 }} color="text.secondary" align="left">
          Current money available
        </Typography>
      </CardContent>
    </Card>
    </Box> 
  );
};
