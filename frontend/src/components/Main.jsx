import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="редактор профиля">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img className="profile__photo" src={avatar} alt="Аватар проофиля" />
        </button>
        <div className="profile__user-wrapper">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="grid-cards" aria-label="фотокарточки">
        <ul className="grid-cards__container">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
