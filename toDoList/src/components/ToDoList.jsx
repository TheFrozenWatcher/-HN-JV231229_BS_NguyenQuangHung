import React, { useState, useEffect, useRef } from "react";
import "../ToDoList.css";
import Form from "./Form";
import BaseButton from "./BaseButton";
import Modal from "./Modal";
import TaskList from "./TaskList";

export default function ToDoList() {
  // Danh sách công việc ban đầu
  const initialList = JSON.parse(localStorage.getItem("todoList")) || [
    "Eat",
    "Sleep",
    "Work",
    "Bath",
  ];

  // Lấy danh sách bao gồm trạng thái hoàn thành
  const [list, setList] = useState(
    initialList.map((item) =>
      typeof item === "string" ? { task: item, finished: false } : item
    )
  );
  const [newTask, setNewTask] = useState("");
  // Đếm số lượng công việc đã hoàn thành
  const [countFinished, setCountFinished] = useState(0);
  // Đặt trạng thái có đang sửa công việc hay không
  const [isEditing, setIsEditing] = useState(false);
  // Đặt vị trí cần sửa
  const [editIndex, setEditIndex] = useState(null);
  // Đặt lỗi
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");
  // Đặt hiển thị và thông tin modal sửa task
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState("");
  // Đặt hiển thị và thông tin modal xóa task
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const inputRef = useRef();

  // Đếm số lượng công việc đã hoàn thành

  useEffect(() => {
    const finishedCount = list.filter((item) => item.finished).length;
    setCountFinished(finishedCount);
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Hàm thêm công việc vào danh sách
  const handleAddToList = () => {
    if (newTask.trim() === "") {
      setAddError("Tên công việc không được để trống");
      return;
    }

    // Tạo lỗi
    setAddError("");
    // Kiểm tra công việc có bị trùng tên không
    const duplicateTask = list.some(
      (item) => item.task.toLowerCase() === newTask.toLowerCase()
    );
    if (duplicateTask) {
      setAddError("Công việc đã tồn tại!");
      return;
    }
    // Nếu không có lỗi thì reset lại input

    setAddError("");

    setList([...list, { task: newTask, finished: false }]);
    setNewTask("");
    //  Focus vào ô input
    inputRef.current.focus();
  };

  // Các hàm sửa công việc

  // Đặt trạng thái đang sửa cho form nhập thông tin

  useEffect(() => {
    if (!showEditModal) {
      setEditError(""); // Reset editError khi đóng modal
    }
  }, [showEditModal]);

  const handleEditTask = (index) => {
    setEditTask(list[index].task);
    setIsEditing(true);
    setEditIndex(index);
    setShowEditModal(true);
  };

  // Cập nhật công việc
  const handleUpdateTask = () => {
    if (editTask.trim() === "") {
      setEditError("Tên công việc không được để trống");
      return;
    }

    const duplicateTask = list.some(
      (item, i) =>
        item.task.toLowerCase() === editTask.toLowerCase() && i !== editIndex
    );
    if (duplicateTask) {
      setEditError("Công việc đã tồn tại!");
      return;
    }
    // Reset form
    setEditError("");
    const updatedList = [...list];
    updatedList[editIndex].task = editTask;
    setList(updatedList);
    setIsEditing(false);
    setEditIndex(null);
    setEditTask("");
    setShowEditModal(false);
  };

  //  Xóa công việc
  const handleDeleteTask = (index) => {
    setShowDeleteModal(true); //Hiện modal
    setDeleteIndex(index); // Lưu vị trí cần xóa
  };

  const confirmDeleteTask = () => {
    const newList = list.filter((_, i) => i !== deleteIndex);
    const newCountFinished = list[deleteIndex].finished
      ? countFinished - 1
      : countFinished;
    setList(newList);
    setCountFinished(newCountFinished);
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  // Cập nhật số lượng công việc dã hoàn thành
  const handleToggleFinish = (index) => {
    const newList = [...list];
    newList[index].finished = !newList[index].finished;
    setList(newList);
    setCountFinished(
      newList[index].finished ? countFinished + 1 : countFinished - 1
    );
  };

  return (
    <div className="container">
      <h1>Công việc cần làm</h1>
      <div className="input-container">
        <input
          placeholder="Nhập tên công việc"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          ref={inputRef}
        />
        <BaseButton onClick={handleAddToList} type="primary">
          Thêm
        </BaseButton>
      </div>
      {addError && <p className="error">{addError}</p>}
      {list.length === 0 ? (
        <div className="align-center">
          <img
            src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
            alt="No data"
          />
        </div>
      ) : (
        <TaskList
          list={list}
          handleToggleFinish={handleToggleFinish}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}

      {list.length > 0 && (
        <>
          {countFinished === list.length ? (
            <p className="completion-message">
              <i className="fa-solid fa-check"></i> Đã hoàn thành toàn bộ!
            </p>
          ) : (
            <span className="progress">
              Công việc đã hoàn thành:{" "}
              <p>
                {countFinished} / {list.length}
              </p>
            </span>
          )}
        </>
      )}

      {showEditModal && (
        <Modal
          title="Cập nhật công việc"
          onClose={() => setShowEditModal(false)}
          onConfirmed={handleUpdateTask}
          error={editError}
        >
          <h4>Tên công việc</h4>
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
          {editError && <p className="error">{editError}</p>}
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          title="Xác nhận xóa"
          onClose={() => setShowDeleteModal(false)}
          onConfirmed={confirmDeleteTask}
          error={null}
        >
          <span class="delete-message">
            <i className="fa-solid fa-exclamation notify-red"></i> Bạn có xác
            nhận xóa công việc "{list[deleteIndex].task}" không?
          </span>
        </Modal>
      )}
    </div>
  );
}
