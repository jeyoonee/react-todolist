import React, { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Input({ handleAdd }) {
  const [todo, setTodo] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleClick = () => {
    if (!todo.trim()) return;
    handleAdd(todo.trim());
    setTodo("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      handleClick();
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[#181D34] " : "bg-[#F5F5F5]"
      } w-full px-1 py-1.5 rounded-b-lg`}
    >
      <div className="flex justify-between rounded-lg bg-white text-xl">
        <input
          autoFocus
          type="text"
          id="text-input"
          placeholder="Add Todo"
          className="px-1 my-[10px] outline-0"
          value={todo}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          className="bg-[#EE852C] cursor-pointer rounded-r-lg text-white w-6"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}
