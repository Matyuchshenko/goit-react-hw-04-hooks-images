import PropTypes from "prop-types";

import { useEffect } from "react";
import "./Modal.css";

import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children, onToggleModal }) {
  useEffect(() => {
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  });

  const handler = (e) => {
    if (e.code === "Escape") {
      onToggleModal();
    }
  };

  const handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
