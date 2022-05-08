import React, { useEffect, useState } from "react";
import moment from "moment";
import "./ABM.css";
import useAuth from "../../hooks/useAuth";
import { createTransaction, getTransactions, update, deleteT } from "../../services/apiServices";
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

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
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

const ABM = () => {
  const styles = useStyles();

  const [type, setType] = useState("");

  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const { auth } = useAuth();
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
    const temp = await getTransactions(auth);
    setData(temp.data.data);
  };
  const postTransaction = async () => {
    await createTransaction(form, auth);
    setData(data.concat(form));
    openCloseModalInsert();
  };

  const updateTransaction = async () => {
    console.log(form.id)
    const response = await update(form.id, form, auth);
    console.log(response.data[0]);
    const tempData = response.data[0]
    var newData = data
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
  

  const deleteTransaction=async()=>{
    console.log("delete")
    await deleteT(form.id, auth)
    setData(data.filter(console=>console.id!==form.id));
    openCloseModalDelete();

  }


  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete=()=>{
    setModalDelete(!modalDelete);
  }


  const selectForm=(field, op)=>{
    setForm(field);
    (op ==='Edit')?openCloseModalEdit():openCloseModalDelete()
  }

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
    console.log(e.target.value);
    const values = await value.split(".");
    setCategory(values[0]);
    setType(values[1]);
  };

  const bodyInsert = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.modal}>
        <h3>Add new operation</h3>
        <br />
        <FormControl className={styles.inputMaterial}>
          <InputLabel htmlFor="grouped-native-select">
            Select category...
          </InputLabel>
          <Select
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
        </FormControl>
        <br />
        <TextField
          required
          name="amount"
          type="number"
          className={styles.inputMaterial}
          label="Amount"
          onChange={handleChange}
        />
        <br />
        <TextField
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
            console.log(date);
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

  const bodyDelete=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la consola <b>{form && form.id}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteTransaction()} >Sí</Button>
        <Button onClick={()=>openCloseModalDelete()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="ABM">
      <br />
      <Button onClick={() => openCloseModalInsert()}>Add</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((field) => (
              <TableRow key={field.id}>
                <TableCell>{field.category}</TableCell>
                <TableCell>{field.amount}</TableCell>
                <TableCell>{field.operationDate}</TableCell>
                <TableCell>{field.type}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.icons}
                    onClick={() => selectForm(field, "Edit")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete className={styles.icons} onClick={()=>selectForm(field, 'Delete')} />
                </TableCell>
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
