import React from "react";

const BUTTON_TYPES = {
  PRIMARY: "primary",
  DANGER: "danger",
  SUCCESS: "success",
};

export default function BaseButton({ type, onClick, children }) {
  return (
    <button
      className={`btn-${type === BUTTON_TYPES.PRIMARY ? BUTTON_TYPES.PRIMARY : type === BUTTON_TYPES.DANGER ? BUTTON_TYPES.DANGER : BUTTON_TYPES.SUCCESS}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
