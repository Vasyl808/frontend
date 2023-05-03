import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function error_handler(error){
    if (error instanceof Error) {
        // This is a network error, display a generic message
        try {
          const errorJson = JSON.parse(error.message);
          const errorFields = Object.keys(errorJson);
          let errorMessage = '';
    
          errorFields.forEach((field) => {
            errorMessage += `${field}: ${errorJson[field][0]}\n`;
          });
            toast.error(`Error:\n${errorMessage}`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 20000 // в мілісекундах
          });
        } catch (e) {
          toast.error(error.message, {
            //position: toast.POSITION.TOP_CENTER,
          autoClose: 20000 // в мілісекундах
        });
        }
      } else {
          toast.error(error.message, {
            //position: toast.POSITION.TOP_CENTER,
          autoClose: 20000 // в мілісекундах
        });
      }
}

export default error_handler;