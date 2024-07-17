import React, { useState , useContext} from 'react';
import Loader from './Loader';


import { TransactionContext } from "../context/TransactionContext";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isLoading , setIsLoading] = useState(false)

  const { handleChange } = useContext(TransactionContext);




  const handleFileChangeImage = async (e) => {
    setIsLoading(true)
    const file = e.target.files[0];
    setImage(file);

    try {
      let formSubmitData = new FormData();
      formSubmitData.append('file', file); // Directly use the file instead of image

      const localUrl = "http://localhost:5000/image";
      const serverUrl = "https://server-form.ruhul.info/image";
      const SubmitUrl = serverUrl;

      const response = await fetch(SubmitUrl, {
        method: 'POST',
        body: formSubmitData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setImageURL(data.imageURL);  


      const value = data.filePath

      handleChange(e,"sign", value," חתימה&nbsp;וחותמת&nbsp;החברה" , "file" ) 
 
    } catch (error) {
 
      console.error('Error:', error);
    }
    

    setIsLoading(false)
  };

  return (
    <div>
          
          {isLoading ? <Loader /> : <img className="text-left mb-4" src={imageURL} alt="" height="30px" />}


   <input type="file" onChange={handleFileChangeImage} />
      
     </div>
  );
}

export default ImageUpload;
