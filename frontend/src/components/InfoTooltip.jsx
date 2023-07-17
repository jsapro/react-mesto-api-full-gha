import React, { useState } from "react";

const InfoTooltip = ({ isOpen, authResultPopupData, closeInfoTooltip }) => {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : null}`}>
      <div className="popup__container">
        <img
          className="popup__auth-img"
          src={authResultPopupData.img}
          alt={`иконка ${authResultPopupData.text}`}
        />
        <p className="popup__auth-message">{authResultPopupData.text}</p>
        <button
          className="popup__close-btn"
          type="button"
          onClick={closeInfoTooltip}
        />
      </div>
    </section>
  );
};

export default InfoTooltip;
