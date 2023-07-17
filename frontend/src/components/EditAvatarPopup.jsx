import React, { useRef, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect } from "react";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const [avatar, setAvatar] = useState("");

  const avatarInputRef = useRef();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setAvatar({
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : ""}
    >
      <input
        id="avatar-url-input"
        className="popup__input popup__input_type_avatar-url"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatarUrl"
        ref={avatarInputRef}
        required
      ></input>
      <span className="popup__input-error avatar-url-input-error"></span>
    </PopupWithForm>
  );
}
