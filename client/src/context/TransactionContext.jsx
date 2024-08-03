import React, { useEffect, useState } from "react"; 
export const TransactionContext = React.createContext();
 
export const TransactionsProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(0)
   
  const [signatureType, setSignatureType] = useState(0);
 

  

  const [formData, setformData] = useState(
    {
      "f1": {
          "value": "",
          "title": "שם החברה"
      },
      "f2": {
          "value": "",
          "title": "מספר ח.פ"
      },
      "f3": {
          "value": "",
          "title": "כתובת"
      },
      "f4": {
          "value": "",
          "title": "תחום עיסוק"
      },
      "f5": {
          "value": "",
          "title": "שם מלא של איש הקשר"
      },
      "f6": {
          "value": "",
          "title": "תפקיד"
      },
      "f8": {
          "value": "",
          "title": "טלפון"
      },
      "f7": {
          "value": "",
          "title": "דוא\"ל"
      },
      "f9": {
          "value": "",
          "title": "נייד"
      },
      "f10": {
          "value": "",
          "title": "קוד אינטרנט"
      },
      "f14": {
          "value": "",
          "title": ""
      },
      "f13": {
          "value": "",
          "title": ""
      },
      "f12": {
          "value": "",
          "title": ""
      },
      "f16": {
          "value": "",
          "title": ""
      },
      "f17": {
          "value": "",
          "title": ""
      },
      "f18": {
          "value": "",
          "title": ""
      },
      "f11": {
          "value": "",
          "title": ""
      },
      "f15": {
          "value": "",
          "title": ""
      },
      "f19": {
          "value": "",
          "title": ""
      },
      "f20": {
          "value": "",
          "title": ""
      },
      "f21": {
          "value": "",
          "title": ""
      },
      "f24": {
          "value": "",
          "title": ""
      },
      "f23": {
          "value": "",
          "title": ""
      },
      "f22": {
          "value": "",
          "title": ""
      },
      "f27": {
          "value": "",
          "title": "תנאי אשראי (בימים)"
      },
      "f26": {
          "value": "",
          "title": "וותק וניסיון מסחרי עם החייב (בשנים)"
      },
      "f25": {
          "value": "",
          "title": "מחזור מכירות שנתי צפוי (באלפי ₪)"
      },
      "f28": {
          "value": "",
          "title": "תקרת אשראי נדרשת (באלפי ₪)"
      },
      "f29": {
          "value": "",
          "title": "ח.פ. (חובה למלא)"
      },
      "f30": {
          "value": "",
          "title": "שם מלא "
      },
      "f31": {
          "value": "",
          "title": "              האם החברה נוהגת לקחת בטחונות מלקוחותיה ? אם כן פרט:\n"
      },
      "f32": {
          "value": "",
          "title": "האם כיום מבוצעת בחברה בדיקה לגבי כושר ההחזר של החייבים איתם החברה עובדת?\nהאם נעשה שימוש לצורך בדיקת החייבים ע\"י חברות מידע? במידה וישנן בדיקות נוספות לבדיקת החייבים, אנא פרט:"
      },
      "f33": {
          "value": "",
          "title": " האם קיים בינך לבין מי מהלקוחות, אשר אתה מבקש לבטח באמצעותנו, סכסוך מסחרי ? תקרות כגון לקוח שלך פטור מלשלם/ זכאי לעכב/לקזז/לתבוע אותך את חובו לך מסיבה כלשהיא. אם כן, פרט:"
      },
      "f34": {
          "value": "",
          "title": "  התגבשות החוב מול הלקוח – באיזה שלב של תכנון או ניהול פרויקט נוצר החוב פרט:"
      },


      "yesNoOption": {
        "value": "",
        "title": " האם החברה מבוטחת כיום כן/לא? או בעבר?"
    },


    "yesNoOption2": {
      "value": "",
    //   "title":  ' האם החברה הייתה מבוטחת ב-3 שנים האחרונות<bdi class="ltr-symbol">?</bdi>'
      "title":  ' האם החברה הייתה מבוטחת ב-3 שנים האחרונות'
  },


  "yesNoOption3": {
    "value": "",
    // "title": '   האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה<bdi class="ltr-symbol">?</bdi>'
    "title": '   האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה'
},




      "date": {
          "value": "",
          "title": "תאריך"
      },
      "sign": {
          "value": "",
          "title": "חתימה וחותמת החברה"
      }
  }
  ); 

  const handleChange = (e,name, value, title , type ) => {
    if(type =="text"  ){
      setformData((prevState) => ({ ...prevState, [name]: {"value": e.target.value,"title":title} }));
 
      console.log(formData); 
    }

    if( type=="number"){
        setformData((prevState) => ({ ...prevState, [name]: {"value": value,"title":title} }));
   
        console.log(formData); 
      }

    if(  type == "radio"){
      console.log(name , "   " , value)
      setformData((prevState) => ({ ...prevState, [name]: {"value":value ,"title":title} }));
 
    }

    if(  type == "date"){
      console.log(name , "   " , e.target.value)
      setformData((prevState) => ({ ...prevState, [name]: {"value":e.target.value ,"title":title} }));
 
    }

    if(  type == "file"){ 
      setformData((prevState) => ({ ...prevState, [name]: {"value":value ,"title":title} }));

      console.log(name , " -  ", value)
      console.log(formData)
 
    }
 
  };


  const handleChangeSignature = (name, value,imgURL, title  ) => {
   
      setformData((prevState) => ({ ...prevState, [name]: {"value":value , "url" : imgURL, "title":title} }));

      console.log(name , " -  ", value)
      console.log(formData)
 
   
  };


 
  
  
 
  return (
    <TransactionContext.Provider
      value={{  
        isLoading, 
        formData,
        signatureType,
        setSignatureType,
        handleChange,
        handleChangeSignature,

        isSubmit, setIsSubmit,
        submitLoading, setSubmitLoading,
        isComplete, setIsComplete,
        submitStatus, setSubmitStatus


      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
