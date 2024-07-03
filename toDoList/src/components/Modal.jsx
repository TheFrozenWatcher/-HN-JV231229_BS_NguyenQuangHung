import React from "react";
import BaseButton from "./BaseButton";

/*
  Thành phần Modal trong React
  - title: Tiêu đề của modal
  - onClose: Hàm xử lý khi đóng modal
  - onConfirmed: Hàm xử lý khi xác nhận hành động
  - error: Thông báo lỗi hiển thị trong modal (nếu có)
  - children: Các thành phần con của modal
*/

export default function Modal({ title, onClose, onConfirmed, error,children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <i className="fa-solid fa-x" onClick={onClose}></i>
        </div>
        
        {children}

        <div className="modal-footer">
          <BaseButton onClick={onClose} type="danger" className="modal-close">
            Hủy
          </BaseButton>
          <BaseButton
            onClick={onConfirmed}
            type="primary"
            className="modal-confirm"
          >
            Đồng ý
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
