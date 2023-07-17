const BASE_URL = "https://auth.nomoreparties.co";

const checkResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.statusText}`);
};

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => checkResponce(res))
    .then((data) => {
      return data;
    })
};

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => checkResponce(res))
    .then((data) => {
      return data;
    })
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => checkResponce(res))
    .then(({data}) => {
      return data;
    })
};
