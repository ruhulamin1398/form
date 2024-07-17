import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import '../utils/style.css'
import "./Tooltips-form"

import YesNoRadio from './YesNoRadio';
import Tooltip from "./Tooltips-form";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2   bg-transparent text-white border-none text-sm white-glassmorphism text-right custom-outline"
  />
);





const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { amount, message } = formData;

    e.preventDefault();

    if (!amount || !message) return;

    // sendTransaction();

  };

  return (



    <div className="flex w-full justify-center items-center pb-[100px] px-[0px] ">
      <div className="flex mf:flex-row-reverse flex-col items-end justify-between md:p-0 py-12 px-md-4">
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="flex justify-between flex-col w-full h-full pt-12">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient my-10 text-center">
              טופס הצעת ביטוח אשראי בישראל
              <br />
              למכירה של סחורות ושירותים
              בישראל
            </h1>
          </div>

          <div className="p-5 sm:w-500 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <div className="flex w-full justify-center items-center">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                <Input
                  placeholder="שם החברה"
                  name="f1"
                  value="f1"

                  type="text"

                  className="text-right"
                />
                <Input
                  placeholder="מספר ח.פ"
                  name="f2"
                  value="f2"
                  type="text"
                  className="text-right"
                />
              </div>
            </div>
            <Input
              placeholder="כתובת"
              name="f3"
              value="f3"
              type="text"

              className="text-right"
            />
            <Input
              placeholder="תחום עיסוק"

              name="f4"
              value="f4"

              type="text"

              className="text-right"
            />

            <div className="flex w-full justify-center items-center">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                <Input
                  placeholder="שם מלא של איש הקשר"


                  name="f5"
                  value="f5"


                  type="text"

                  className="text-right"
                />
                <Input
                  placeholder="תפקיד"

                  name="f6"
                  value="f6"


                  type="text"

                  className="text-right"
                />
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">
                <Input
                  placeholder='דוא"ל'


                  name="f7"
                  value="f7"


                  type="text"

                  className="text-right"
                />
                <Input
                  placeholder="טלפון"
                  name="f8"
                  value="f8"
                  type="text"

                  className="text-right"
                />
              </div>
            </div>





            <div className="flex w-full justify-end items-end">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[100%] ">


                <h4 className="text-right  mx-[20px] mt-[20px]  flex-1 pb-[10px] w-full font-bold text-white">
                  <div class="rtl-text">

                    נייד
                  </div>

                </h4>


                <Input


                  name="f9"
                  value="f10"
                  type="text"

                  className="text-right flex-auto"
                />
              </div>
            </div>




            <div className="flex w-full justify-end items-end">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[100%] ">


                <h4 className="text-right  mt-[20px]  flex-1 pb-[10px] w-full font-bold text-white">
                  <div class="rtl-text text-nowrap  ">
                    קוד&nbsp;אינטרנט

                  </div>


                </h4>


                <Tooltip />

                <Input


                  name="f10"
                  value="f10"


                  type="text"

                  className="text-right      flex-auto"
                />
              </div>
            </div>





            <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">פירוט מכירות (באלפי ₪ )</h4>

            <div className="flex w-full justify-center items-center p-0 m-0">
              <div className="flex flex-col items-center justify-between  pb-12  w-full">
                <div className="  w-full flex flex-col justify-start items-center blue-glassmorphism">
                  <table className="min-w-full bg-transparent text-white  ">
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
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">


                          <Input


                            name="f12"
                            value="f12"

                            type="text"

                            className="text-right"
                          />



                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input

                          name="f13"
                          value="f13"
                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input



                          name="f14"
                          value="f14"



                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">סה"כ מחזור מכירות בהתאם למאזנים</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input



                          name="f15"
                          value="f15"
                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input

                          name="f16"
                          value="f16"

                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input




                          name="f17"
                          value="f17"
                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input


                          name="f18"
                          value="f18"
                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray "> חובות אבודים ו/או חובות בטיפול   משפטי <strong>(שנוצרו בשנים אלו בלבד)</strong> </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-right table-border-gray">

                          <Input

                            name="f19"
                            value="f19"
                            type="text"
                            placeholder="סכום"

                            className="text-right"
                          />


                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">

                          <Input




                            name="f20"
                            value="f20"

                            type="text"
                            placeholder="שנה"

                            className="text-right"
                          />


                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray" colSpan="2">
                          <Input

                            name="f21"
                            value="f21"
                            type="text"
                            placeholder="שם חייב/מדינה"

                            className="text-right"
                          />

                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray"> תיאור מקרי החובות האבודים הגדולים   ב-3 שנים האחרונות</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-right table-border-gray">

                          <Input

                            name="f22"
                            value="f22"
                            type="text"
                            placeholder="מה נעשה בנידון"

                            className="text-right"
                          />



                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">


                          <Input

                            name="f22"
                            value="f22"

                            type="text"
                            placeholder="סכום"

                            className="text-right"
                          />



                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray" colSpan="2">
                          <Input


                            name="f23"
                            value="f23"
                            type="text"
                            placeholder="שם חייב/מדינה"

                            className="text-right"
                          />
                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray rtl-text">

                          חובות לקוחות אשר בפיגור של יותר מ- 90 יום מעבר לזמן פירעונם )נכון ליום מילוי ההצהרה)

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>






            <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">

              רשימת חייבים לבדיקה


            </h4>


            <div className="flex w-full justify-center items-center p-0 m-0">
              <div className="flex flex-col items-center justify-between  pb-12  w-full">
                <div className="  w-full flex flex-col justify-start items-center blue-glassmorphism">
                  <table className="min-w-full bg-transparent text-white pcTable">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">מחזור מכירות שנתי צפוי
                          (באלפי ₪)</th>
                        <th className="px-4 py-2">וותק וניסיון מסחרי עם החייב (בשנים) </th>
                        <th className="px-4 py-2">תנאי אשראי (בימים)</th>
                        <th className="px-4 py-2">תקרת אשראי נדרשת (באלפי ₪)</th>
                        <th className="px-4 py-2">ח.פ. (חובה למלא)</th>
                        <th className="px-4 py-2">שם מלא </th>
                      </tr>
                    </thead>
                    <tbody className="table-border-gray">
                      <tr>
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">


                          <Input


                            name="f12"
                            value="f12"

                            type="text"

                            className="text-right"
                          />



                        </td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input

                          name="f13"
                          value="f13"
                          type="text"

                          className="text-right"
                        /></td>
                        <td className="border px-4 py-2 text-right table-border-gray">    <Input



                          name="f14"
                          value="f14"



                          type="text"

                          className="text-right"
                        /></td>

                        <td className="border px-4 py-2 text-right table-border-gray">    <Input



                          name="f14"
                          value="f14"



                          type="text"

                          className="text-right"
                        /></td>

                        <td className="border px-4 py-2 text-right table-border-gray">    <Input



                          name="f14"
                          value="f14"



                          type="text"

                          className="text-right"
                        /></td>

                      </tr>


                    </tbody>
                  </table>


                  <table className="min-w-full bg-transparent text-white mTable">
                    
                    <tbody className="table-border-gray">
                      <tr>


                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>

                        <th className="px-4 py-2">מחזור מכירות שנתי צפוי
                          (באלפי ₪)</th>


                      </tr>


                      <tr>
 
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>

                        <th className="px-4 py-2">וותק וניסיון מסחרי עם החייב (בשנים) </th>

                      </tr>




                      <tr>

 
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>

                        <th className="px-4 py-2">תנאי אשראי (בימים)</th>

                      </tr>




                      <tr>

 
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>


                        <th className="px-4 py-2">תקרת אשראי נדרשת (באלפי ₪)</th>
                      </tr>




                      <tr>
 
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>

                        <th className="px-4 py-2">ח.פ. (חובה למלא)</th>

                      </tr>




                      <tr>
 
                        <td className="border px-4 py-2 text-right table-border-gray">
                          <Input

                            name="f11"
                            value="f11"
                            type="text"

                            className="text-right"
                          />
                        </td>

                      <th className="px-4 py-2">שם מלא </th>  


                      </tr>


                    </tbody>
                  </table>





                </div>
              </div>
            </div>








            <h4 dir="rtl" className="  pt-[30px] pb-[10px] w-full font-bold text-white">

              האם החברה נוהגת לקחת בטחונות מלקוחותיה ? אם כן פרט:

            </h4>



            <Input
              name="f24"
              value="f24"
              type="text"
              placeholder="פרט"

              className="text-right"
            />


            <h4 dir="rtl" className="  pt-[30px] pb-[10px] w-full font-bold text-white">
              האם כיום מבוצעת בחברה בדיקה לגבי כושר ההחזר של החייבים איתם החברה עובדת ?
              האם נעשה שימוש לצורך בדיקת החייבים ע"י חברות מידע ? במידה וישנן בדיקות נוספות לבדיקת החייבים, אנא פרט:
            </h4>

            <Input

              name="f25"
              value="f25"


              type="text"
              placeholder="פרט"

              className="text-right"
            />


            <div className="flex w-full justify-end items-end">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[40%]  ">






                <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                  <div class="rtl-text">

                    האם החברה מבוטחת כיום כן/לא? או בעבר?
                  </div>

                </h4>

                <YesNoRadio
                  name="yesNoOption2"
                  value={formData.yesNoOption}

                />
              </div>
            </div>


            <div className="flex w-full justify-end items-end">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[40%]  ">
                <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                  <div class="rtl-text">
                    האם החברה הייתה מבוטחת ב-3 שנים האחרונות<bdi class="ltr-symbol">?</bdi>
                  </div>

                </h4>
                <YesNoRadio
                  name="yesNoOption3"
                  value={formData.yesNoOption}

                />
              </div>
            </div>


            <div className="flex w-full justify-end items-end">
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-[50%]  ">
                <h4 className="text-right   pb-[10px] w-full font-bold text-white">
                  <div class="rtl-text">
                    האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה<bdi class="ltr-symbol">?</bdi>
                  </div>
                </h4>
                <YesNoRadio
                  name="yesNoOption"
                  value={formData.yesNoOption}

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

              name="f26"
              value="f26"
              type="text"
              placeholder="פרט"

              className="text-right"
            />

            <h4 className="text-right pt-[30px] pb-[10px] w-full font-bold text-white">
              <div class="rtl-text">
                התגבשות החוב מול הלקוח – באיזה שלב של תכנון או ניהול פרויקט נוצר החוב
                פרט:
              </div>
            </h4>

            <Input

              name="f27"
              value="f27"


              type="text"
              placeholder="פרט"

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
              <div className="flex mf:flex-row-reverse flex-col items-start justify-between md:py-2 py-1 w-full gap-2">



                <div className="flex items-center">

                  <Input
                    type="date"
                    className="flex-1 text-right py-2 px-3 rounded-lg bg-gray-200"
                  />


                  <h4 className="pr-4 pt-[30px] pb-[10px] ml-[30px] mb-[20px] font-bold text-white">
                    תאריך
                  </h4>


                </div>




                <div className="flex items-center ">

                  <Input
                    name="message"
                    type="file"
                    className="flex-1 text-right py-2 px-3 rounded-lg bg-gray-200"
                  />


                  <h4 className=" flex-1 pr-4 pt-[30px] pb-[10px] ml-[30px] mb-[20px] font-bold text-white">
                    חתימה&nbsp;וחותמת&nbsp;החברה

                  </h4>


                </div>







              </div>
            </div>



            {isLoading ? <Loader /> : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer mt-[50px] mb-[50px]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>




  );
};

export default Welcome;