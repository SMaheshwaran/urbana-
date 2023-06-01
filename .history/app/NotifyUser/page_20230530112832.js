"use client";
import "../../Styles/NotifyUser.css";
import { useState } from "react";
export default function NotifyUser() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [notifyClicked, setNotifyClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [ntype, setNtype] = useState();
  const [nonVisitor, setNonVisitor] = useState(false);
  const getUserData = async () => {
    const res = await fetch("/api/NotifyUser", {
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    setData(data);
  };

  useState(() => {
    getUserData();
  }, []);

  const notifyUser = async () => {
    const res = await fetch("/api/NotifyUser", {
      method: "POST",
      body: JSON.stringify({
        nameOfUser: name,
        apartment: apartment,
        notificationType: ntype,
        Message: message,
      }),
    });

    console.log(res);
  };

  const handleClick = (apartment, name) => {
    console.log(apartment, name);
    setName(name);
    setApartment(apartment);
    setIsModalOpen(true);
  };

  const closeModel = () => {
    setIsModalOpen(false);
  };

  const sendNotification = (num) => {
    console.log(num);
    setNtype(num);
    if (num === 3) {
      setShowMessage(true);
    }
    
    else if(num ==1){
      
      setMessage("food delivery is here");
      setNonVisitor(true);
    }
    else if(num ==2){
      
      setMessage("Product delivery is here");
      setNonVisitor(true);
    }
  };



  const finalSend = () => {
    notifyUser();
  };

 if(nonVisitor){
  notifyUser()
 }

  return (
    <div className="flex flex-wrap justify-center w-full h-screen">
      {data.map((d, index) => (
        <div
          key={index}
          className="letter-div"
          onClick={() => handleClick(d.apartment, d.name)}
        >
          {d.apartment}
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModel}
        handleClick={handleClick}
      >
        <h1>{name}</h1>
        <h1>{apartment}</h1>
        <button
          type="button"
          onClick={() => setNotifyClicked(true)}
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Notify
        </button>

        {notifyClicked && (
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => sendNotification(1)}>
              Notify for food delivery
            </button>
            <button onClick={() => sendNotification(2)}>
              Notify for Product delivery
            </button>
            <button onClick={() => sendNotification(3)}>
              Notify for Visitor
            </button>
          </div>
        )}

        {showMessage && (
          <>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="enter your message"
              required
            />

            <button onClick={finalSend}> confirm</button>
          </>
        )}
      </Modal>
    </div>
  );
}

const Modal = ({ isOpen, onClose, handleClick, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </div>
  );
};
