import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <i
          className="fa-solid fa-bars icon menu"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        ></i>
        <div className="new-chat" onClick={()=>newChat()}>
          <i className="fa-solid fa-plus icon"></i>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <i className="fa-regular fa-message icon"></i>
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <i className="fa-regular fa-circle-question icon"></i>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <i className="fa-solid fa-clock-rotate-left icon"></i>
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <i className="fa-solid fa-gear icon"></i>
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
