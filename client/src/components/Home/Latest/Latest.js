import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Latest.css";
import { getLatest, getTransactions } from "../../../services/apiServices";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

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
  const { auth } = useAuth();
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
      <h3>Recent Transactions</h3>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {operations.map((row) => (
              <TableRow
                key={row.category}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.operationDate}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.amount)}>
                    {row.amount}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
