import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const Notification = () => {
    //const[is, setIs] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [orderData, setOrderData] = useState('');

    function handleClick() {
        setIsOpen(!isOpen);
      }

    useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    if(localStorage.getItem('userstatus') === "pharmacist"){
        
  
      socket.emit('admin_connect');

      socket.on('admin_connect', (data) => {
        
        toast.success("jsdhjksfhdjhgdfjhs")
        console.log('Connected to WebSocket');
      });
      

      //socket.on('connect', function() {
      //  console.log('Connected to server');});
        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

  
      // підписка на подію "new_purchase"
      socket.on('new_purchase', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });
      
      socket.on('user_update_order', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });

      socket.on('user_delete_order', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });

      return () => {
        socket.disconnect();
      };
    }
    else if(localStorage.getItem('userstatus') === "user"){
      //const socket = io('http://127.0.0.1:5000');
      socket.emit('user_connect');

      //socket.on('user_connect', (data) => {
      //  toast.success("jsdhjksfhdjhgdfjhs")
      //  console.log('Connected to WebSocket');
      //});

      socket.on('admin_update_order', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });

      socket.on('admin_update_order_details', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });

      socket.on('admin_delete_order', (data) => {
        setIsOpen(true);
        setOrderData(data.data);
        console.log('New purchase added: ', data);
        toast.success(data.data,{
          position: toast.POSITION.TOP_CENTER,
        autoClose: 20000 // в мілісекундах
      })
      });
      socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });
    return () => {
      socket.disconnect();
    };
    }
      
    }, []);

    return (
        <div>
        {isOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
               <div>{orderData}</div>
              <button onClick={handleClick}>Close</button>
            </div>
          </div>
        </div>
      )}
        </div>
      );
  }
  

export default Notification;
