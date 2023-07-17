import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithSubmit from "./PopupWithSubmit";
import InfoTooltip from "./InfoTooltip";
import Footer from "./Footer";
import authSuccessImg from "../images/auth-success.png";
import authFailImg from "../images/auth-fail.png";
import api from "../utils/api";
import * as auth from "../utils/auth-api.js";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [authResultPopupData, setAuthResultPopupData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((e) => console.log(`ошибка-Promise.all: ${e}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data?.email) {
            setUserData(data);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardLike = React.useCallback(
    (card, isLiked) => {
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((e) => console.log(`Ошибка: ${e}`));
    },
    [selectedCard]
  );

  const handleCardDelete = React.useCallback(
    (card) => {
      setCardIdToDelete(card._id);
      setIsSubmitPopupOpen(true);
    },
    [selectedCard]
  );

  const handleCardDeleteApprove = React.useCallback(
    (cardIdToDelete) => {
      setIsLoading(true);
      api
        .deleteCard(cardIdToDelete)
        .then((_) => {
          setCards((cards) => cards.filter((c) => c._id !== cardIdToDelete));

          setIsSubmitPopupOpen(false);
        })
        .catch((e) => console.log(`Ошибка: ${e}`))
        .finally(() => setIsLoading(false));
    },
    [selectedCard]
  );

  const handleCardClick = React.useCallback(
    (card) => {
      setSelectedCard(card);
    },
    [selectedCard]
  );

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  const handleupdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((e) => console.log(`Ошибка: ${e}`))
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatar({ avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((e) => console.log(`Ошибка: ${e}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((e) => console.log(`Ошибка: ${e}`))
      .finally(() => setIsLoading(false));
  }

  const handleRegisterSubmit = (formValue) => {
    auth
      .register(formValue)
      .then(({ data }) => {
        if (data?.email) {
          setUserData(data);
          setIsInfoTooltipOpen(true);
          setAuthResultPopupData({
            text: "Вы успешно зарегистрировались!",
            img: authSuccessImg,
          });
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setAuthResultPopupData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: authFailImg,
        });
        console.log(err);
      });
  };

  const handleLoginSubmit = (formValue) => {
    auth
      .authorize(formValue)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem("jwt", data.token);
          setUserData(formValue);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setAuthResultPopupData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: authFailImg,
        });
        console.log(err);
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userData={userData}
          loggedIn={isLoggedIn}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                onSubmit={handleRegisterSubmit}
                userData={userData}
                userPassword={userPassword}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onSubmit={handleLoginSubmit}
                userData={userData}
                userPassword={userPassword}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={Main}
                loggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>

        {/*<!-- Попап редактирования профиля --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleupdateUser}
          isLoading={isLoading}
        />

        {/* <!-- Попап добавления карточки --> */}
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
        />

        {/* <!-- Попап удаления карточки --> */}
        <PopupWithSubmit
          onClose={closeAllPopups}
          isLoading={isLoading}
          isOpen={isSubmitPopupOpen}
          onSubmit={handleCardDeleteApprove}
          cardIdToDelete={cardIdToDelete}
        />

        {/* <!-- Попап открытия карточки --> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* <!-- Попап изменения аватара --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          closeInfoTooltip={closeAllPopups}
          authResultPopupData={authResultPopupData}
        />

        {isLoggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
