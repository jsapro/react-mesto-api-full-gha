import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <figure className={`popup popup_open-card ${card && "popup_opened"}`}>
      <div className="popup__open-photo">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__img" src={card?.link} alt={card?.name} />
        <figcaption className="popup__caption">{card?.name}</figcaption>
      </div>
    </figure>
  );
}
