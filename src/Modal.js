import React, { useState } from "react";
import { Modal, Button } from "antd";

export default function AntModal({ trigger, children }) {
  const [open, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!open);
  }

  return (
    <>
      <div onClick={toggleModal}>{trigger}</div>
      <Modal
        centered
        bodyStyle={{
          padding: "1rem",
          overflowY: "scroll",
          maxHeight: "calc(100vh - 10rem)",
          marginBottom: "5rem"
        }}
        footer={false}
        closable={false}
        visible={open}
        onCancel={toggleModal}
      >
        {children}
      </Modal>
    </>
  );
}
