import React, { useContext } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DarkModeContext } from "../context/DarkModeContext";

export default function List({ activeTab, items, handleCheck, handleDelete }) {
  const { darkMode } = useContext(DarkModeContext);

  const filterItems = (todos) => {
    switch (activeTab) {
      case 2:
        return todos.filter((todo) => !todo.isChecked);
      case 3:
        return todos.filter((todo) => todo.isChecked);
      default:
        return todos;
    }
  };

  const filteredItems = filterItems(items);

  return (
    <ul
      className={`flex flex-col px-1 py-1.5 text-[#F2F3F7] text-xl min-h-[250px]
      ${darkMode ? "bg-[#1F2036]" : "bg-[#FCFFFD]"}
      ${filteredItems.length === 0 ? "justify-center" : ""}
      `}
    >
      {filteredItems.length === 0 ? (
        <li className="text-center text-gray-400 py-2  ">
          할 일을 추가해주세요
        </li>
      ) : (
        filteredItems.map((item) => (
          <li
            key={item.id}
            className="flex cursor-pointer justify-between items-center mb-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={item.id.toString()}
                checked={item.isChecked}
                onChange={() => handleCheck(item.id)}
                className={`cursor-pointer mr-0.5 w-1.25 h-1.25`}
              />
              <label
                htmlFor={item.id.toString()}
                className={`
                ${darkMode ? "" : "text-[#596160]"}
                ${item.isChecked ? "line-through text-gray-400" : ""} `}
              >
                {item.name}
              </label>
            </div>
            <span
              className={` p-[4px] rounded-xl cursor-pointer  transition
              ${
                darkMode
                  ? "bg-[#4A5150] hover:bg-[#5e6766]"
                  : "bg-[#a0a3b1] hover:bg-[#838a89]"
              }
              `}
              onClick={() => handleDelete(item.id)}
            >
              <RiDeleteBin6Fill />
            </span>
          </li>
        ))
      )}
    </ul>
  );
}
