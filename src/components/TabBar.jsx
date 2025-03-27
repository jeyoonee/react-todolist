import React, { useContext } from "react";
import { PiSun, PiSunFill } from "react-icons/pi";
import { DarkModeContext } from "../context/DarkModeContext";

export default function TabBar({ items, handleClickTab }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex flex-row justify-between px-1 py-1.5  rounded-t-lg 
      ${
        darkMode
          ? "bg-[#181C34] border-b border-b-2 border-b-[#373952]"
          : "bg-[#F5F5F5]"
      }`}
    >
      <button className="cursor-pointer" onClick={toggleDarkMode}>
        {darkMode ? (
          <PiSun className="text-white w-1.5 h-1.5" />
        ) : (
          <PiSunFill className="text-[#a0a3b1] w-1.5 h-1.5" />
        )}
      </button>

      <div className=" flex text-[#EE852C] text-xl">
        {items.map((item) => (
          <div
            key={item.id}
            className={`ml-1 cursor-pointer py-[3px] ${
              item.isActive && darkMode ? "border-b-2 border-white" : ""
            } ${
              item.isActive && !darkMode ? "border-b-2 border-[#a0a3b1]" : ""
            }`}
            onClick={() => handleClickTab(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
