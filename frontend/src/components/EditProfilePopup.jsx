import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : ""}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Имя"
        name="nickname"
        minLength="2"
        maxLength="40"
        required
        value={name ?? ""}
        onChange={handleNameChange}
      />
      {/* <!-- Если написать name="name", то вылетает ошибка --> */}

      <span className="popup__input-error name-input-error"></span>

      <input
        id="job-input"
        className="popup__input popup__input_type_job"
        type="text"
        placeholder="Работа"
        name="job"
        minLength="2"
        maxLength="200"
        required
        value={description ?? ""}
        onChange={handleDescriptionChange}
      />

      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}
