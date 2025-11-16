import React from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { ImMenu } from "react-icons/im";
import { FaPlay } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";

// Assets
import logo from '../assets/logo.png';
import esLogo from '../assets/esLogo.png';
import ODS from '../assets/ODS.png';
import menu from '../assets/menu.png';

// Styles
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button
        type="button"
        className="returnButton"
        onClick={handleReturn}
        aria-label="Voltar"
      >
        <IoMdReturnLeft className="returnIcon" />
      </button>

      <img src={logo} className="logo" alt="logo" />
      <div className="avatar">
        <div className="avatar-image">JANE</div>
      </div>

      <img src={ODS} className="ODS" alt="ODS" />

      <img src={esLogo} className="esLogo" alt="decoration" />
      <img src={menu} className="menu" alt="menu" />

      <div className="topIcons">
        <div className="topIcon playIcon" title="Play"><FaPlay /></div>
        <div className="topIcon peopleIcon" title="Profiles"><MdEmojiPeople /></div>
        <div className="topIcon notificationIcon" title="Notificações"><IoIosNotifications /></div>
        <div className="topIcon emailIcon" title="Mensagens"><MdEmail /></div>
      </div>
    </div>
  );
}
