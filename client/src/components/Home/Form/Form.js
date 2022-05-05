import React, { useEffect, useState } from "react";
import { createTrasaction, getCategories } from "../../../services/apiServices";
import useAuth from "../../../hooks/useAuth";
import { catere } from "../../../data/categories";

const Form = () => {
  const { auth, setAuth } = useAuth();

  const [ type, setType] = useState("")

  const [categ, setCateg] = useState([]);

  const [note, setNote] = useState("");

  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    categories();
  }, []);

  const categories = async () => {
    const data = await getCategories();
    const cate = await data.data.data;
    setCateg(catere);
    categ.map((cat) => console.log(cat.name));
    console.log(categ);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type);

    try {
      const transaction = await createTrasaction(
        { 
          type,
          category,
          amount: amount,
          description: note,
        },
        auth.token
      );
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add transaction</h1>

      <form onSubmit={handleSubmit}>
        <div className="">
          <div onChange={(e) => setType(e.target.value)}>
            <input type="radio" value="Expense" checked/> Expense
            <input type="radio" value="Income"  /> Income
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Write note"
              className="form-input"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <select
            className="form-input"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose Category..." disabled selected hidden>
              Choose Category...
            </option>
            <>
              {categ.map((cat) => {
                return (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="$0"
              className="form-input"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="submit-btn">
            <button className="">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
