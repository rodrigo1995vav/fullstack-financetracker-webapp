import React, { useEffect, useState } from "react";
import moment from "moment";
import "./ABM.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Edit, Delete } from "@material-ui/icons";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { categories } from "../../data/categories";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    maxWidth: 400,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const makeStyle = (status) => {
  if (status === "Income") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
      padding: "0.5rem",
      'border-radius': "0.5rem",
    };
  } else if (status === "Expense") {
    return {
      background: "#ffadad8f",
      color: "red",
      padding: "0.5rem",
      'border-radius': "0.5rem",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
      padding: "0.5rem",
      'border-radius': "0.5rem",
    };
  }
};

const ABM = () => {
  const styles = useStyles();

  const axiosPrivate = useAxiosPrivate();

  const [type, setType] = useState("");

  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const [data, setData] = useState([]);

  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    type: "",
    operationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
      operationDate: moment(date).format("YYYY-MM-DD"),
      category: category,
      type: type,
    }));
    console.log(form);
  };

  const handleChangeTwo = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(form);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const temp = await axiosPrivate.get("/transactions");
    setData(temp.data.data);
  };
  const postTransaction = async () => {
    const response = await axiosPrivate.post("/transactions", form);
    console.log(response);
    setData(data.concat(form));
    openCloseModalInsert();
  };

  const updateTransaction = async () => {
    const response = await axiosPrivate.put("/transactions/" + form.id, form);
    console.log(response.data[0]);
    const tempData = response.data[0];
    var newData = data;
    newData.map((console) => {
      if (tempData.id === console.id) {
        console.amount = tempData.amount;
        console.type = tempData.type;
        console.operationDate = tempData.operationDate;
        console.category = tempData.category;
      }
    });
    setData(newData);
    openCloseModalEdit();
  };

  const deleteTransaction = async () => {
    await axiosPrivate.delete("/transactions/" + form.id);
    setData(data.filter((console) => console.id !== form.id));
    openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const selectForm = (field, op) => {
    setForm(field);
    op === "Edit" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const dropDownExpense = (cat) => {
    if (cat.type === "Expense") {
      return (
        <option
          key={cat.name}
          name="category"
          value={cat.name + "." + cat.type}
        >
          {cat.name}
        </option>
      );
    }
  };

  const dropDownIncome = (cat) => {
    if (cat.type === "Income") {
      return (
        <option
          key={cat.name}
          name="category"
          value={cat.name + "." + cat.type}
        >
          {cat.name}
        </option>
      );
    }
  };

  const handleSelectChange = async (e) => {
    const value = e.target.value;
    const values = await value.split(".");
    setCategory(values[0]);
    setType(values[1]);
  };

  const handleFilter = async (e) => {
    const value = e.target.value.split(".")[0];
    if (value !== "All") {
      const temp = await axiosPrivate.get("/transactions");
      const val = temp.data.data.filter((item) => item.category === value);
      setData(val);
    } else getData();
  };

  const bodyInsert = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.modal}>
        <Typography>Add New Transaction</Typography>
        <br />
        <FormControl className={styles.inputMaterial}>
          <InputLabel htmlFor="grouped-native-select">
            Select category...
          </InputLabel>
          <Select
            required
            className={styles.inputMaterial}
            onChange={(e) => handleSelectChange(e)}
            native
            defaultValue=""
            id="grouped-native-select"
            label="Grouping"
          >
            <option aria-label="None" value="" />
            <optgroup label="Expense">
              <>{categories.map((cat) => dropDownExpense(cat))}</>
            </optgroup>
            <optgroup label="Income">
              <>{categories.map((cat) => dropDownIncome(cat))}</>
            </optgroup>
          </Select>
          <br />
          <TextField
            required
            name="amount"
            type="number"
            className={styles.inputMaterial}
            label="$0"
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            name="description"
            className={styles.inputMaterial}
            label="Description"
            onChange={handleChange}
          />
          <br />
          <br />
          <MobileDatePicker
            label="Transaction Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <br />
          <div align="right">
            <Button color="primary" onClick={() => postTransaction()}>
              Save
            </Button>
            <Button onClick={() => openCloseModalInsert()}>Cancel</Button>
          </div>
        </FormControl>
      </div>
    </LocalizationProvider>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit Transaction</h3>
      <br />
      <TextField
        name="amount"
        className={styles.inputMaterial}
        label="Amount"
        onChange={handleChangeTwo}
        value={form && form.amount}
      />
      <br />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => updateTransaction()}>
          Edit
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyDelete = (
    <div className={styles.modal}>
      <p>
        Are you sure you want to delete this ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteTransaction()}>
          Yes
        </Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="ABM">
      <br />
      <Button variant="contained" onClick={() => openCloseModalInsert()}>
        New Operation
      </Button>
      <br />
      <Box
        sx={{ flexGrow: 0, display: "flex", flexDirection: "row", p: 1, m: 1 }}
      >
        <FormControl>
          <InputLabel htmlFor="grouped-native-select">
            Select category...
          </InputLabel>
          <Select
            className={styles.inputMaterial}
            onChange={(e) => handleFilter(e)}
            native
            defaultValue="All"
            id="grouped-native-select"
            label="Grouping"
          >
            <option label="All" value="All" />
            <optgroup label="Expense">
              <>{categories.map((cat) => dropDownExpense(cat))}</>
            </optgroup>
            <optgroup label="Income">
              <>{categories.map((cat) => dropDownIncome(cat))}</>
            </optgroup>
          </Select>
        </FormControl>
      </Box>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((field) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Edit
                    className={styles.icons}
                    onClick={() => selectForm(field, "Edit")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.icons}
                    onClick={() => selectForm(field, "Delete")}
                  />
                </TableCell>
                <TableCell>{field.category}</TableCell>
                <TableCell>{field.amount}</TableCell>
                <TableCell>{field.operationDate}</TableCell>
                <TableCell>
                  <span className="type" style={makeStyle(field.type)}>
                    {field.type}
                  </span>
                </TableCell>
                <TableCell>{field.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalInsert} onClose={() => openCloseModalInsert()}>
        {bodyInsert}
      </Modal>

      <Modal open={modalEdit} onClose={() => openCloseModalEdit()}>
        {bodyEdit}
      </Modal>

      <Modal open={modalDelete} onClose={openCloseModalEdit}>
        {bodyDelete}
      </Modal>
    </div>
  );
};

export default ABM;
