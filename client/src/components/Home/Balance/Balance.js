import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import Box from "@mui/material/Box";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { format } from "../../../utils/moneyFormatter";


export const Balance = () => {

  const axiosPrivate = useAxiosPrivate();

  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    totalBalance();
  }, []);

  const totalBalance = async () => {
    try {
      const data = await axiosPrivate.get("/transactions");

      const allOperations = data.data.data;
      let tempExpense = 0;
      let tempIncome = 0;
      console.log(allOperations);
      allOperations.map((op) => {
        if (op.type === "Expense") tempExpense += op.amount;
        if (op.type === "Income") tempIncome += op.amount;
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
        {format(currentBalance)}
        </Typography>
        <Typography sx={{fontSize: 14 }} color="text.secondary" align="left">
          Current money available
        </Typography>
      </CardContent>
    </Card>
    </Box> 
  );
};
