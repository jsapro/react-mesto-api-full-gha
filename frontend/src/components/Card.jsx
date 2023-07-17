import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid-card__like ${
    isLiked ? "grid-card__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="grid-card">
      <div>
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            className="grid-card__delete"
            type="button"
          />
        )}
        <img
          className="grid-card__img"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="grid-card__caption">
        <h2 className="grid-card__name">{card.name}</h2>
        <div className="grid-card__like-wrapper">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <span className="grid-card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default React.memo(Card);
