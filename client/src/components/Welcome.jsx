import React, { useContext, useEffect, useState } from "react";

import { TransactionContext } from "../context/TransactionContext";
import { Done, Loader } from ".";
import '../utils/style.css'
import "./Tooltips-form"
import { activeHost } from "../utils/constant";

import YesNoRadio from './YesNoRadio';
import Tooltip from "./Tooltips-form";
import SignaturePopup from './SignaturePad';
import ImageUpload from "./myFileUplaod";
import Submit from "./Submit";

import Toast from './Toast';
import LoaderBig from "./LoaderBig";
import PInput from "./input/Pinput";
import Input from "./input/Input";
import ModalInput from "./input/ModalInput";
import DynamicTable from "./input/DynamicTable";
import SubmitSuccess from "./SubmitSuccess";
import Txarea from "./input/Txarea"


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// const Input = ({ placeholder, name, type, value, title, handleChange, className }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     name={name}
//     title={title}
//     // value={value}
//     onChange={(e) => handleChange(e, name, value, title, type)}
//     className=" form-input my-2 w-full rounded-sm p-2   bg-transparent text-white  text-sm white-glassmorphism text-right  border border-[#413d3ddb] border-[0.1px]"
//   />
// );


// const PInput = ({ placeholder, name, type, value, title, handleChange, className }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     name={name}
//     title={title}
//     // value={value}
//     onChange={(e) => handleChange(e, name, value, title, type)}
//     className=" form-input my-2 w-full rounded-sm p-2   bg-transparent text-white  text-sm white-glassmorphism text-right  border border-[#413d3ddb] border-[0.1px] pcTable  "
//   />
// );









const Welcome = () => {
  const { submnissionStage, setSubmnissionStage, dPDFLink, setDPDFLink, handleChange, formData, signatureType, isSubmit, setIsSubmit, submitLoading, setSubmitLoading, isComplete, setIsComplete, submitStatus, setSubmitStatus, isToastError, setIsToastError, toastErrorMessage, setToastErrorMessage, } = useContext(TransactionContext);


  const [isToast, setIsToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");





  const [isChecked, setIsChecked] = useState(false);



  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    console.log(isChecked)
  };



  const showToast = () => {




    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 3000); // Hide the toast after 3 seconds
  };





  const handleSubmit = async (e) => {
    console.log("signatureType  :: ", signatureType)

    if(!isChecked){
      setToastTitle("Checkbox is required")


          console.log("checkbox Toast")
          showToast();
          return ;
    }

    if (signatureType == 0) {

      console.log("Signature Toast")
      setToastTitle("יש לחתום דיגיטלית או להעלות קובץ חתימה")
      showToast()
      return;
    }

    //! 10 largest customers 
    if (formData["list"].value.length < 10) {

      console.log(" list ", formData["list"].value.length)
      setToastTitle("יש למלא את 10 הלקוחות הגדולים")

      showToast();

      //!!!!!!!!!!!!!!! uncomment this 
      // return;

    }


    //! check all filed inside list 
    for (let key in formData) {
      let isError = false;


      console.log(formData["list"].value)
      for (let index in formData["list"].value) {
        for (let key in formData["list"].value[index]) {

          if (!formData["list"].value[index][key]) {


            isError = true
          }

        }

        if (isError) {
          setToastTitle("נא למלא את כל השדות הנדרשים")
          // setToastTitle("xxxxxxxxxxxxxxxxxxxxxxxxxxx")   


          showToast();

          //!!!!!!!!!!!!!!! uncomment this 
          // return;
        }
      }


      // ! check all field mandatory
      if (key != "list" && key != 'pdf') {

        if (!formData[key].value.trim()) {
          console.log(key, " : ", formData[key].title, "   - ", formData[key].value)


          setToastTitle("נא למלא את כל השדות הנדרשים")


          console.log("Field Toast")
          showToast();


          //!!!!!!!!!!!!!!! uncomment this 
          // return;
        }

      }




    }







    setIsSubmit(true)
    setSubmitLoading(true)
    e.preventDefault();



    try {




      // checking all field are mendatory 





      const response = await fetch(activeHost + '/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('Success:', data);
      let pdflink = data.pdfLink
      console.log(" pdf link from submit ", pdflink)
      setDPDFLink(pdflink)
      setIsComplete(true)
      setSubmitStatus(1)
      setSubmnissionStage(3)

    } catch (error) {
      console.error('Error:', error);
      setIsComplete(true)
      setSubmitStatus(2)

      // Handle error (e.g., show an error message)
    }

    setSubmitLoading(false)
  };




  const title32 = `האם כיום מבוצעת בחברה בדיקה לגבי כושר ההחזר של החייבים איתם החברה עובדת?
האם נעשה שימוש לצורך בדיקת החייבים ע"י חברות מידע? במידה וישנן בדיקות נוספות לבדיקת החייבים, אנא פרט:`;


  return (
    <>





      <div className={`flex justify-center items-center pb-[10px] px-[10px] overflow-x-hidden w-full max-w-screen-lg mx-auto  ${submnissionStage < 3 ? 'block' : 'hidden'}`}>

        <div className="flex mf:flex-row-reverse flex-col items-end justify-between md:p-0   px-md-4">
          <div className="flex flex-col flex-1 items-center justify-start mf:mt-0 mt-2 md:mt-10">
            <div className="flex justify-between flex-col  pt-2 md:pt-12">


              <h1 className="text-xl md:text-5xl text-white  my-5  md:my-10 text-center">
                טופס הצעת ביטוח אשראי למכירה של סחורות ושירותים בישראל
              </h1>
            </div>

            <div className="p-5 sm:w-500 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                  <Input
                    placeholder="שם החברה"
                    name="f1"


                    title="שם החברה"
                    handleChange={handleChange}

                    type="text"
                    InputType="text"

                    className="text-right"
                  />
                  <Input
                    placeholder="מספר ח.פ"
                    name="f2"
                    type="text"
                    InputType="number"

                    title="מספר ח.פ"
                    handleChange={handleChange}

                    className="text-right"
                  />
                </div>
              </div>
              <Input
                placeholder="כתובת"
                name="f3"
                type="text"
                InputType="text"

                title="כתובת"
                handleChange={handleChange}

                className="text-right"
              />
              <Input
                placeholder="תחום עיסוק"

                name="f4"

                type="text"
                InputType="text"

                title="תחום עיסוק"
                handleChange={handleChange}

                className="text-right"
              />

              <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                  <Input
                    placeholder="שם מלא של איש הקשר"


                    name="f5"


                    type="text"
                    InputType="text"


                    title="שם מלא של איש הקשר"
                    handleChange={handleChange}

                    className="text-right"
                  />
                  <Input
                    placeholder="תפקיד"

                    title="תפקיד"
                    handleChange={handleChange}


                    name="f6"


                    type="text"
                    InputType="text"

                    className="text-right"
                  />
                </div>
              </div>

              <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                  <Input
                    placeholder='דוא"ל'

                    title='דוא"ל'
                    handleChange={handleChange}



                    name="f7"


                    type="email"
                    InputType="email"

                    className="text-right"
                  />
                  <Input
                    placeholder="טלפון"


                    title="טלפון"
                    handleChange={handleChange}


                    name="f8"
                    type="text"
                    InputType="number"

                    className="text-right"
                  />
                </div>
              </div>





              <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">





                  <Input


                    title="נייד"
                    placeholder="נייד"
                    handleChange={handleChange}

                    name="f9"
                    type="text"
                    InputType="number"

                    className="text-right flex-auto"
                  />
                </div>
              </div>




              <div className="flex w-full justify-end items-end">
                <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[100%] ">

                  <div className="flex ml-auto mr-0">

                    <Tooltip />
                    <h4 className="text-right  mt-[20px]  flex-1 pb-[10px] w-full font-bold text-white">
                      <div class="rtl-text text-nowrap  ">
                        קוד&nbsp;אינטרנט

                      </div>


                    </h4>


                  </div>


                  <Input


                    title="קוד&nbsp;אינטרנט"
                    handleChange={handleChange}

                    name="f10"


                    type="text"

                    InputType="number"

                    className="text-right      flex-auto"
                  />






                </div>
              </div>





              <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">פירוט מכירות (באלפי ₪ )</h4>

              <div className="flex w-full justify-center items-center p-0 m-0">
                <div className="flex flex-col items-center justify-between  pb-12  w-full">
                  <div className="  w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <div className="containerHorizontal"  >
                      <table className="min-w-full bg-transparent text-white teblehorizontal " >
                        <thead>
                          <tr>
                            <th className="px-4 py-2">צפי מכירות לשנת 2024            </th>
                            <th className="px-4 py-2">2023</th>
                            <th className="px-4 py-2">2022</th>
                            <th className="px-4 py-2">2021</th>
                            <th className="px-4 py-2">שנה</th>
                          </tr>
                        </thead>
                        <tbody className="table-border-gray">
                          <tr>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <ModalInput
                                title=""
                                handleChange={handleChange}
                                name="f11"
                                type="text"
                                InputType="number"
                              />

                              <PInput
                                title=""
                                handleChange={handleChange}
                                name="f11"
                                InputType="number"


                              />
                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">


                              <ModalInput


                                title=""
                                handleChange={handleChange}
                                name="f12"

                                type="number"
                                InputType="number"

                              />



                              <PInput


                                title=""
                                handleChange={handleChange}
                                name="f12"
                                InputType="number"
                                type="number"

                              />




                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <ModalInput


                                title=""
                                handleChange={handleChange}

                                name="f13"
                                type="text"
                                InputType="number"

                                className="text-right"
                              />


                              <PInput


                                title=""
                                handleChange={handleChange}

                                name="f13"
                                type="text"
                                InputType="number"

                              />


                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">


                              <ModalInput

                                title=""
                                handleChange={handleChange}
                                name="f14"
                                type="text"

                                InputType="number"
                              />



                              <PInput
                                title=""
                                handleChange={handleChange}
                                name="f14"
                                type="text"
                                InputType="number"
                              />



                            </td>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray"     >סה"כ מחזור מכירות בהתאם למאזנים</td>
                          </tr>

                          <tr>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">



                              <ModalInput

                                title=""
                                handleChange={handleChange}


                                name="f15"
                                type="text"
                                InputType="number"

                              />




                              <PInput

                                title=""
                                handleChange={handleChange}


                                name="f15"
                                type="text"
                                InputType="number"


                              />



                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">



                              <ModalInput
                                title=""
                                handleChange={handleChange}
                                name="f16"
                                type="text"
                                InputType="number"
                              />



                              <PInput
                                title=""
                                handleChange={handleChange}
                                name="f16"
                                type="text"
                                InputType="number"

                              />



                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">



                              <ModalInput



                                title=""
                                handleChange={handleChange}
                                InputType="number"

                                name="f17"
                                type="text"

                              />



                              <PInput



                                title=""
                                handleChange={handleChange}

                                name="f17"
                                type="text"
                                InputType="number"


                              />




                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">



                              <ModalInput


                                title=""
                                handleChange={handleChange}
                                InputType="number"
                                name="f18"
                                type="text"

                              />

                              <PInput


                                title=""
                                handleChange={handleChange}
                                name="f18"
                                type="text"
                                InputType="number"


                              />



                            </td>
                            <td className="border px-4 py-2 text-right table-border-gray " rowSpan="2"> חובות אבודים ו/או חובות בטיפול   משפטי <strong>(שנוצרו בשנים אלו בלבד)</strong> </td>
                          </tr>
                          <tr> <td colSpan="4" className="px-4">
                          <Txarea
                            name="tx1"

                            handleChange={handleChange}
                            />
                          </td></tr>

                          <tr>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">

                              <ModalInput


                                title=""
                                handleChange={handleChange}
                                InputType="number"

                                name="f19"
                                type="text"
                                placeholder="סכום"

                              />



                              <PInput


                                title=""
                                handleChange={handleChange}

                                name="f19"
                                type="text"
                                InputType="number"

                                placeholder="סכום"


                              />


                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">

                              <ModalInput



                                title=""
                                handleChange={handleChange}

                                name="f20"

                                InputType="number"
                                type="text"
                                placeholder="שנה"

                              />




                              <PInput
                                title=""
                                handleChange={handleChange}

                                name="f20"

                                type="text"
                                InputType="number"

                                placeholder="שנה"

                              />




                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray" colSpan="2">
                              <ModalInput

                                title=""
                                handleChange={handleChange}
                                name="f21"
                                type="text"
                                InputType="text"
                                placeholder="שם חייב/מדינה"

                              />



                              <PInput

                                title=""
                                handleChange={handleChange}
                                name="f21"
                                type="text"
                                InputType="text"

                                placeholder="שם חייב/מדינה"


                              />


                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray" rowSpan="2"> תיאור מקרי החובות האבודים הגדולים   ב-3 שנים האחרונות</td>
                          </tr>
                          <tr> <td colSpan="4" className="px-4">
                            <Txarea
                            name="tx2"

                            handleChange={handleChange}
                            />
                          </td></tr>
                          <tr>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">

                              <ModalInput

                                title=""
                                handleChange={handleChange}
                                name="f22"
                                type="text"
                                placeholder="מה נעשה בנידון"
                                InputType="text"

                              />



                              <PInput

                                title=""
                                handleChange={handleChange}
                                name="f22"
                                type="text"

                                InputType="text"
                                placeholder="מה נעשה בנידון"

                                className="text-right pcTable "
                              />

                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">


                              <ModalInput

                                title=""
                                handleChange={handleChange}
                                name="f23"

                                InputType="number"
                                type="text"
                                placeholder="סכום"

                              />




                              <PInput

                                title=""
                                handleChange={handleChange}
                                name="f23"

                                type="text"
                                InputType="number"

                                placeholder="סכום"

                                className="text-right pcTable"
                              />





                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray" colSpan="2">
                              <ModalInput

                                title=""
                                handleChange={handleChange}

                                InputType="text"
                                name="f24"
                                type="text"
                                placeholder="שם חייב/מדינה"

                                className="text-right"
                              />




                              <PInput
                                title=""
                                handleChange={handleChange}

                                name="f24"
                                type="text"
                                InputType="text"
                                placeholder="שם חייב/מדינה"

                                className="text-right pcTable"
                              />



                            </td>
                            <td className="border px-4 py-2 text-right table-border-gray rtl-text" rowSpan="2">

                              חובות לקוחות אשר בפיגור של יותר מ- 90 יום מעבר לזמן פירעונם (נכון ליום מילוי ההצהרה)

                            </td>
                          </tr>
                          <tr> <td colSpan="4" className="px-4">
                          <Txarea
                            name="tx3"

                            handleChange={handleChange}
                            />
                          </td></tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
              </div>






              <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">

                רשימת חייבים לבדיקה


              </h4>


              <div className="flex w-full justify-center items-center p-0 m-0">
                <div className="flex flex-col items-center justify-between  pb-12  w-full">
                  <div className="  w-full flex flex-col justify-start items-center blue-glassmorphism">



                    <DynamicTable />





                    {/* <table className="min-w-full bg-transparent text-white ">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">מחזור מכירות שנתי צפוי
                              (באלפי&nbsp;₪)</th>
                            <th className="px-4 py-2">וותק וניסיון מסחרי עם החייב (בשנים) </th>
                            <th className="px-4 py-2">תנאי אשראי (בימים)</th>
                            <th className="px-4 py-2">תקרת אשראי נדרשת (באלפי ₪)</th>
                            <th className="px-4 py-2">ח.פ. (חובה למלא)</th>
                            <th className="px-4 py-2">שם מלא </th>
                          </tr>
                        </thead>
                        <tbody className="table-border-gray">
                          <tr>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="מחזור מכירות שנתי צפוי
 (באלפי ₪)"
                                handleChange={handleChange}

                                name="f25"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="וותק וניסיון מסחרי עם החייב (בשנים)"
                                handleChange={handleChange}
                                name="f26"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="תנאי אשראי (בימים)"
                                handleChange={handleChange}

                                name="f27"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input

                                title="תקרת אשראי נדרשת (באלפי&nbsp₪)"
                                handleChange={handleChange}
                                name="f28"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>


                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="ח.פ. (חובה למלא)"
                                handleChange={handleChange}


                                name="f29"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>
                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input

                                title="שם מלא "
                                handleChange={handleChange}
                                name="f30"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>

                          </tr>


                        </tbody>
                      </table> */}


                    {/* <table className="min-w-full bg-transparent text-white mTable">

                        <tbody className="table-border-gray">
                          <tr>


                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="מחזור מכירות שנתי צפוי
 (באלפי ₪)"
                                handleChange={handleChange}

                                name="f25"
                                type="text"
                                InputType="text"

                                className="text-right"
                              />
                            </td>

                            <th className="px-4 py-2 border table-border-gray">מחזור מכירות שנתי צפוי
                              <br /> (באלפי&nbsp;₪)</th>


                          </tr>


                          <tr>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="וותק וניסיון מסחרי עם החייב (בשנים)"
                                handleChange={handleChange}
                                name="f26"
                                InputType="text"
                                type="text"

                                className="text-right"
                              />
                            </td>

                            <th className="px-4 py-2 border table-border-gray">וותק וניסיון מסחרי עם החייב (בשנים) </th>

                          </tr>




                          <tr>


                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="תנאי אשראי (בימים)"
                                handleChange={handleChange}

                                name="f27"
                                InputType="text"
                                type="text"

                                className="text-right"
                              />
                            </td>

                            <th className="px-4 py-2 border table-border-gray">תנאי אשראי (בימים)</th>

                          </tr>




                          <tr>


                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input

                                title="תקרת אשראי נדרשת (באלפי&nbsp;₪)"
                                handleChange={handleChange}
                                name="f28"
                                InputType="text"
                                type="text"

                                className="text-right"
                              />
                            </td>


                            <th className="px-4 py-2 border table-border-gray">תקרת אשראי נדרשת (באלפי&nbsp;₪)</th>
                          </tr>




                          <tr>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input


                                title="ח.פ. (חובה למלא)"
                                handleChange={handleChange}


                                name="f29"
                                InputType="text"
                                type="text"

                                className="text-right"
                              />
                            </td>

                            <th className="px-4 py-2 border table-border-gray">ח.פ. (חובה למלא)</th>

                          </tr>




                          <tr>

                            <td className="border px-2 md:px-4 py-2 text-right table-border-gray">
                              <Input

                                title="שם מלא "
                                handleChange={handleChange}
                                name="f30"
                                InputType="text"
                                type="text"

                                className="text-right"
                              />
                            </td>

                            <th className="px-4 py-2">שם מלא </th>


                          </tr>


                        </tbody>
                      </table> */}





                  </div>
                </div>
              </div>








              <h4 dir="rtl" className="  pt-[30px] pb-[10px] w-full font-bold text-white">

                האם החברה נוהגת לקחת בטחונות מלקוחותיה ? אם כן פרט:

              </h4>



              <Input


                title="              האם החברה נוהגת לקחת בטחונות מלקוחותיה ? אם כן פרט:
"
                handleChange={handleChange}


                name="f31"
                InputType="text"
                type="text"
                // placeholder="פרט"

                className="text-right"
              />


              <h4 dir="rtl" className="  pt-[30px] pb-[10px] w-full font-bold text-white">
                האם כיום מבוצעת בחברה בדיקה לגבי כושר ההחזר של החייבים איתם החברה עובדת ?
                האם נעשה שימוש לצורך בדיקת החייבים ע"י חברות מידע ? במידה וישנן בדיקות נוספות לבדיקת החייבים, אנא פרט:
              </h4>

              <Input


                title={title32}

                handleChange={handleChange}



                name="f32"
                InputType="text"


                type="text"
                // placeholder="פרט"

                className="text-right"
              />


              <div className="flex w-full justify-end items-end">
                <div className="flex mf:flex-row-reverse flex-col items-end md:items-start justify-between md:py-2 py-1  w-[100%] lg:w-[40%]  ">






                  <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                    <div class="rtl-text">

                      האם החברה מבוטחת כיום כן/לא? או בעבר?
                    </div>

                  </h4>

                  <YesNoRadio
                    name="yesNoOption"
                    title="האם החברה מבוטחת כיום כן/לא? או בעבר?"
                    handleChange={handleChange}

                  />
                </div>
              </div>


              <div className="flex w-full justify-end items-end">
                <div className="flex mf:flex-row-reverse flex-col items-end md:items-start justify-between md:py-2 py-1 lg:w-[40%] w-[100%]  ">
                  <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                    <div class="rtl-text">
                      האם החברה הייתה מבוטחת ב-3 שנים האחרונות<bdi class="ltr-symbol">?</bdi>
                    </div>

                  </h4>
                  <YesNoRadio
                    name="yesNoOption2"
                    title=" האם החברה הייתה מבוטחת ב-3 שנים האחרונות<bdi class='ltr-symbol'>?</bdi>"
                    handleChange={handleChange}
                  />
                </div>
              </div>


              <div className="flex w-full justify-end items-end">
                <div className="flex mf:flex-row-reverse flex-col items-end md:items-start justify-between md:py-2 py-1 lg:w-[50%] w-[100%]  ">
                  <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                    <div class="rtl-text">
                      האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה<bdi class="ltr-symbol">?</bdi>
                    </div>
                  </h4>
                  <YesNoRadio
                    name="yesNoOption3"
                    title='   האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה<bdi class="ltr-symbol">?</bdi>'
                    handleChange={handleChange}


                  />
                </div>
              </div>

              <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">
                <div class="rtl-text">
                  האם קיים בינך לבין מי מהלקוחות, אשר אתה מבקש לבטח באמצעותנו, סכסוך מסחרי ? תקרות כגון לקוח שלך פטור מלשלם/ זכאי לעכב/לקזז/לתבוע אותך את חובו לך מסיבה כלשהיא.
                  אם כן, פרט:

                </div>
              </h4>

              <Input


                title=" האם קיים בינך לבין מי מהלקוחות, אשר אתה מבקש לבטח באמצעותנו, סכסוך מסחרי ? תקרות כגון לקוח שלך פטור מלשלם/ זכאי לעכב/לקזז/לתבוע אותך את חובו לך מסיבה כלשהיא.
                אם כן, פרט:"
                handleChange={handleChange}
                body
                name="f33"
                InputType="text"
                type="text"
                // placeholder="פרט"

                className="text-right"
              />

              <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">
                <div class="rtl-text">
                  התגבשות החוב מול הלקוח – באיזה שלב של תכנון או ניהול פרויקט נוצר החוב
                  פרט:
                </div>
              </h4>

              <Input




                title="  התגבשות החוב מול הלקוח – באיזה שלב של תכנון או ניהול פרויקט נוצר החוב
                פרט:"
                handleChange={handleChange}



                name="f34"
                InputType="text"


                type="text"
                // placeholder="פרט"

                className="text-right"
              />

              <h4 className="text-right pt-[30px] pb-[30px] w-full font-bold text-white">



                <div class="rtl-text">
                  אנו מצהירים בזאת כי הנתונים והתשובות המפורטים בבקשתנו לביטוח זו נכונים ושלמים.
                  <br />
                  ידוע לנו כי אלה מהווים, בין היתר, בסיס להצעת הבטוח שתתנו לנו.

                  <br />
                  אנו מתחייבים לעדכן אתכם, לאחר חתימתנו על הצעת ביטוח זו ועד להוצאת הפוליסה על ידכם, מיד
                  <br />


                  לאחר שיודע לנו כי מי מהנתונים והתשובות כאמור אינם נכונים או שלמים.
                </div>

              </h4>



              <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row-reverse flex-col items-end md:items-start md:justify-between md:py-2 py-1 w-full gap-2">



                  <div className="flex items-center text-right w-full md:w-auto mb-0">

                    <Input
                      type="date"

                      handleChange={handleChange}
                      title="תאריך"
                      name="date"

                      className="form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-sm white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px]"
                    />


                    <h4 className="pr-4 pt-[30px] pb-[10px] ml-[30px] mb-[20px] font-bold text-white">
                      תאריך
                    </h4>


                  </div>



                  <div className="flex items-center ">


                    <ImageUpload />

                    <SignaturePopup />



                    <h4 className="pl-2 pb-[8px] md:pl-[20px] flex-1 pr-4 mb-[0px] mt-auto   font-bold text-white">
                      חתימה&nbsp;וחותמת&nbsp;החברה

                    </h4>



                  </div>







                </div>
              </div>





              <label className="flex items-center space-x-2 mt-4 px-2  mt-[20px] md:mt-[100px] md:px-10">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#3d4f7c] border-gray-300 rounded focus:ring-[#3d4f7c]"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="text-white pl-4">
                  I have reviewed the form data, and everything looks correct. I agree to submit the data.
                </span>
              </label>




              {submitLoading ? (
                <LoaderBig />
              ) : (
                submnissionStage === 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer mt-[50px] mb-[50px]"
                  >
                    Submit
                  </button>
                ) : null
              )}




              <hr />



            </div>
          </div>
        </div>
      </div>




      {
        isToast ?
          <Toast
            textTitle={toastTitle}

          /> : null
      }


      {submnissionStage == 3 ? <SubmitSuccess /> : ""}




    </>


  );

};

export default Welcome;
