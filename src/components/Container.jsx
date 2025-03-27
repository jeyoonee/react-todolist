import React, { useEffect, useReducer, useState } from "react";
import { DarkModeProvider } from "../context/DarkModeContext";
import todoReducer from "../reducer/todo-reducer";
import Input from "./Input";
import List from "./List";
import TabBar from "./TabBar";

export default function Container() {
  const [tabs, setTabs] = useState([
    { id: 1, name: "All", isActive: true },
    { id: 2, name: "Active", isActive: false },
    { id: 3, name: "Completed", isActive: false },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const [todos, dispatch] = useReducer(todoReducer, undefined, getInitialTodos);

  // todos가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos), [todos]);
  });

  const handleChangeTab = (id) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === id ? { ...tab, isActive: true } : { ...tab, isActive: false }
      )
    );
    setActiveTabId(id);
  };

  const handleAddTodo = (todo) => {
    dispatch({
      type: "added",
      name: todo,
    });
  };

  const handleCheckTodo = (id) => {
    dispatch({
      type: "checked",
      id,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  return (
    <DarkModeProvider>
      <div className="flex flex-col  m-auto rounded-lg min-w-[460px] shadow-[0_0_24px_rgba(0,0,0,0.75)]">
        <TabBar items={tabs} handleClickTab={handleChangeTab} />
        <List
          items={todos}
          handleCheck={handleCheckTodo}
          handleDelete={handleDeleteTodo}
          activeTab={activeTabId}
        />
        <Input handleAdd={handleAddTodo} />
      </div>
    </DarkModeProvider>
  );
}

// localStorage에서 초기값 불러오기
const getInitialTodos = () => {
  const stored = localStorage.getItem("todos");

  return stored
    ? JSON.parse(stored)
    : [
        { id: 1, name: "감사일기", isChecked: false },
        { id: 2, name: "독서", isChecked: false },
        { id: 3, name: "개발공부", isChecked: false },
      ];
};
