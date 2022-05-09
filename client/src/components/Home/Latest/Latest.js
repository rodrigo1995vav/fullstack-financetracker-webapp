import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./Latest.css";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


const makeStyle = (status) => {
  if (status === "Income") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Expense") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [operations, setOperations] = useState([])
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    const data = await axiosPrivate.get("/transactions/latest")
    //const data = await getLatest(auth);
    setOperations(data.data.data);
  };

  return (
    <div className="Table">
      <h3 className="Title">Recent Transactions</h3>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {operations.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.operationDate}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.type)}>
                    {row.type}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
