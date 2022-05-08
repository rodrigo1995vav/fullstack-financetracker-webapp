// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { getTransactions } from "../../../services/apiServices";

// const Latest = () => {
//   const { auth } = useAuth();
//   const [operations, setOperations] = useState([])


//   useEffect(() => {
//     list();
//   }, []);

//   const list = async () => {
//     const data = await getTransactions(auth);
//     setOperations(data.data.data)
//   };

//   return operations.map( op => (
//     <div className="">
//       <h1 className="">{op.amount}</h1>
//     </div>
//   ));
// };

// export default Latest;
