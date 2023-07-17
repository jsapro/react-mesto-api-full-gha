import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : null}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={name}
        >
          {children}
          <button className="popup__submit" type="submit">
            {buttonText || "Сохранить"}
          </button>
        </form>
        <button className="popup__close-btn" type="button" onClick={onClose} />
      </div>
    </section>
  );
}
