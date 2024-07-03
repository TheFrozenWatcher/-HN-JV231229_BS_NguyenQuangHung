import React, { useRef } from "react";
import BaseButton from "./BaseButton";

export default function Form({ onSubmit, onChange, value, error }) {
  const inputRef = useRef();

  return (
    <div>
      <input
        placeholder="Nhập tên công việc"
        type="text"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      {error && <p className="error">{error}</p>}
      <BaseButton onClick={onSubmit} type="primary">
        Thêm
      </BaseButton>
    </div>
  );
}
