class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  _request(endPoint, options = {}) {
    const params = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      ...options,
    };
    return fetch(`${this._baseUrl}/${endPoint}`, params).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    return this._request(`cards/`);
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
    });
  }

  postCard({ name, link }) {
    return this._request(`cards/`, {
      method: "POST",
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  setUserInfo({ name, about }) {
    return this._request(`users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  getUserInfoFromServer() {
    return this._request(`users/me`, {
      method: "GET",
    });
  }

  setUserAvatar({ avatar }) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  setLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
    });
  }

  deleteLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.setLike(id);
    }
  }
}

const api = new Api({
  baseUrl: "https://api.getlike-jsapro.nomoredomains.xyz",
});

export default api;
