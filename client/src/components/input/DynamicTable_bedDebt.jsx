// ! create an array and push to form data at Transaction contex 

// DynamicTable.jsx
import React, { useState, useContext } from 'react';
import InputTable from './InputTable';

import { TransactionContext } from '../../context/TransactionContext';
import ModalInputTable from './ModalInputTable';
import Txarea from './Txarea';
import PInput from './Pinput';
import ModalInput from './ModalInput';

const DynamicTable = () => {
  const { formData, setformData } = useContext(TransactionContext)
  const [rows, setRows] = useState([createEmptyRow()]);

  function createEmptyRow() {
    return {
      f15: '',
      f16: '',
      f17: '',
      f18: '',
      tx1: '',
    };
  }

  const handleChange = (e, index) => {
    console.log(" index  ", index)
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    setformData((prevState) => ({ ...prevState, ["bedDebtList"]: { "value": newRows } }));

    console.log("formData   ", formData)
  };

  const addRow = () => {
    setRows([...rows, createEmptyRow()]);
  };

  const removeRow = (index) => {
    console.log("index  : ", index);
    console.log(rows[index])
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);

      setformData((prevState) => ({ ...prevState, ["bedDebtList"]: { "value": newRows } }));
    }
  };

  return (
    <>



      <tr>
   

 
 
        <td className="border px-4 py-2 text-right table-border-black " colSpan="4" rowSpan="1"> חובות אבודים ו/או חובות בטיפול   משפטי <strong>(שנוצרו בשנים אלו בלבד)</strong>
          <br />
         
        </td>

        <td className="border px-4 py-2 text-right table-border-black " colSpan="1" rowSpan="1">  
          <button
            onClick={() => addRow()}
            className="mr-2 bg-[#3d4f7c] text-white px-2 py-1 rounded"
          >
            +
          </button>
        </td>
       </tr>







      {rows.map((row, index) => (
        <>
        <tr key={index}>
          <td className="border px-2 md:px-4 py-2 text-right table-border-black">
            <InputTable
              handleChange={(e) => handleChange(e, index)}
              name="f15"
              type="text"
              className="text-right"
              value={row['f15']}
            />

            <ModalInputTable


              title=""
              handleChange={(e) => handleChange(e, index)}
              name="15"
              index={index}

              type="text"
              value={row['f15']}

            />



          




        






          </td>


          <td className="border px-2 md:px-4 py-2 text-right table-border-black">
            <InputTable
              title="תקרת אשראי נדרשת (באלפי ₪)"
              handleChange={(e) => handleChange(e, index)}
              name="f16"
              type="text"
              className="text-right"

              value={row['f16']}
            />


            <ModalInputTable


              title=""
              handleChange={(e) => handleChange(e, index)}
              name="16"
              index={index}

              type="text"
              value={row['f16']}

            />


          </td>
          <td className="border px-2 md:px-4 py-2 text-right table-border-black">
            <InputTable
              title="ח.פ. (חובה למלא)"
              handleChange={(e) => handleChange(e, index)}
              name="f17"
              type="text"
              className="text-right"

              value={row['f17']}
            />


            <ModalInputTable


              title=""
              handleChange={(e) => handleChange(e, index)}
              name="17"
              index={index}

              type="text"
              value={row['f17']}

            />




          </td>
          <td className="border px-2 md:px-4 py-2 text-right table-border-black">
            <InputTable
              title="שם מלא"
              handleChange={(e) => handleChange(e, index)}
              name="f18"
              type="text"
              className="text-right"

              value={row['f18']}
            />

            <ModalInputTable


              title=""
              handleChange={(e) => handleChange(e, index)}
              name="18"
              index={index}

              type="text"
              value={row['f18']}

            />


          </td>
          <td  rowSpan="2" className="border px-2 md:px-4 py-2 text-right table-border-black">
            {rows.length != 1 ?
              <button
                onClick={() => removeRow(index)}
                className="bg-[#3d4f7c] text-xs text-black px-2 py-1 text-white rounded"
              >
                X
              </button>

              : ""}
          </td>
        </tr>
           <tr> <td colSpan="4" className="px-4">
           <Txarea
             name="tx1"
             value={row['tx1']}
   
             handleChange={(e) => handleChange(e, index)}
           >
            {row['tx1']}
            </Txarea>
         </td></tr>
</>
      ))}
    </>
  );
};

export default DynamicTable;
