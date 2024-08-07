// ! create an array and push to form data at Transaction contex 

// DynamicTable.jsx
import React, { useState, useContext } from 'react';
import InputTable from './InputTable';

import { TransactionContext } from '../../context/TransactionContext';
import ModalInputTable from './ModalInputTable';

const DynamicTable = () => {
  const { formData, setformData } = useContext(TransactionContext)
  const [rows, setRows] = useState([createEmptyRow()]);

  function createEmptyRow() {
    return {
      f25: '',
      f26: '',
      f27: '',
      f28: '',
      f29: '',
      f30: '',
    };
  }

  const handleChange = (e, index) => {
    console.log(" index  ", index)
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    setformData((prevState) => ({ ...prevState, ["list"]: { "value": newRows } }));

    console.log("length   ", rows.length)
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

      setformData((prevState) => ({ ...prevState, ["list"]: { "value": newRows } }));
    }
  };

  return (
    <div>
      <table className="min-w-full bg-transparent text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm md:text-lg">מחזור מכירות שנתי צפוי (באלפי ₪)</th>
            <th className="px-4 py-2 text-sm md:text-lg">וותק וניסיון מסחרי עם החייב (בשנים)</th>
            <th className="px-4 py-2 text-sm md:text-lg">תנאי אשראי (בימים)</th>
            <th className="px-4 py-2 text-sm md:text-lg">תקרת אשראי נדרשת (באלפי ₪)</th>
            <th className="px-4 py-2 text-sm md:text-lg">ח.פ. (חובה למלא)</th>
            <th className="px-4 py-2 text-sm md:text-lg">שם מלא</th>
            <th className="px-4 py-2 text-sm md:text-lg">   <button
              onClick={() => addRow()}
              className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              +
            </button></th>
          </tr>
        </thead>
        <tbody className="table-border-gray">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  handleChange={(e) => handleChange(e, index)}
                  name="f25"
                  type="text"
                  className="text-right"
                  value={row['f25']}
                />

                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="25"
                  index={index}

                  type="text"
                  value={row['f25']}

                />




              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  title="וותק וניסיון מסחרי עם החייב (בשנים)"
                  handleChange={(e) => handleChange(e, index)}
                  name="f26"
                  type="text"
                  className="text-right"
                  value={row['f26']}
                />

                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="26"
                  index={index}

                  type="text"
                  value={row['f26']}

                />



              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  title="תנאי אשראי (בימים)"
                  handleChange={(e) => handleChange(e, index)}
                  name="f27"
                  type="text"
                  className="text-right"

                  value={row['f27']}
                />


                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="27"
                  index={index}

                  type="text"
                  value={row['f27']}

                />



              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  title="תקרת אשראי נדרשת (באלפי ₪)"
                  handleChange={(e) => handleChange(e, index)}
                  name="f28"
                  type="text"
                  className="text-right"

                  value={row['f28']}
                />


                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="28"
                  index={index}

                  type="text"
                  value={row['f28']}

                />


              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  title="ח.פ. (חובה למלא)"
                  handleChange={(e) => handleChange(e, index)}
                  name="f29"
                  type="text"
                  className="text-right"

                  value={row['f29']}
                />


                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="29"
                  index={index}

                  type="text"
                  value={row['f29']}

                />




              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                <InputTable
                  title="שם מלא"
                  handleChange={(e) => handleChange(e, index)}
                  name="f30"
                  type="text"
                  className="text-right"

                  value={row['f30']}
                />

                <ModalInputTable


                  title=""
                  handleChange={(e) => handleChange(e, index)}
                  name="30"
                  index={index}

                  type="text"
                  value={row['f30']}

                />


              </td>
              <td className="border px-2 md:px-4 py-2 text-right table-border-gray">

                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
