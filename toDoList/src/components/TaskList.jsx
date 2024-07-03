import React from "react";
import BaseButton from "./BaseButton";

/*
  Thành phần TaskList 
  - list: Danh sách các công việc
  - handleToggleFinish: Hàm xử lý khi người dùng thay đổi trạng thái hoàn thành của công việc
  - handleEditTask: Hàm xử lý khi người dùng chỉnh sửa công việc
  - handleDeleteTask: Hàm xử lý khi người dùng xóa công việc
*/

export default function TaskList({
  list,
  handleToggleFinish,
  handleEditTask,
  handleDeleteTask,
}) {
  return (
    <ul>
      {list.map((task, index) => (
        <li key={index} className="list-item">
          <input
            type="checkbox"
            checked={task.finished}
            onChange={() => handleToggleFinish(index)}
            className="checkbox"
          />
          <span className={`task ${task.finished ? "finished" : ""}`}>
            {task.task}
          </span>
          <div className="option-container">
            {/* Lấy index của task cần cập nhật */}
              <i  onClick={() => handleEditTask(index)}className="fa-solid fa-pen color-orange"></i>
             
              <i  onClick={() => handleDeleteTask(index)} className="fa-solid fa-trash color-red" ></i>
          </div>
        </li>
      ))}
    </ul>
  );
}
