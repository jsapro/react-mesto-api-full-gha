import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithSubmit({
  isLoading,
  isOpen,
  onSubmit,
  onClose,
  cardIdToDelete,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(cardIdToDelete);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
