import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress, donationAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
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
      "title":  ' האם החברה הייתה מבוטחת ב-3 שנים האחרונות<bdi class="ltr-symbol">?</bdi>'
  },


  "yesNoOption3": {
    "value": "",
    "title": '   האם סירב מבטח אשראי לבטח את החברה בעבר או ביטל/לא חידש את הביטוח שלה<bdi class="ltr-symbol">?</bdi>'
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
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e,name, value, title , type ) => {
    if(type =="text"){
      setformData((prevState) => ({ ...prevState, [name]: {"value": e.target.value,"title":title} }));
 
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

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));



        console.log('completed transations')
        console.log(structuredTransactions);
        const transactionCount = await transactionsContract.getTransactionCount();
        // console.log(`Total Completd transaction ${transactionCount}   hahahah`)
        





        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      // if (!ethereum) return alert("Please install MetaMask.");


      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      // if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const {  amount,  message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        const keyword =  'hi';
        const addressTo = donationAddress;
                          


        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
