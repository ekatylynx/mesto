export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResult(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['popup-form-name'],
                about: data['popup-form-about'],
            })
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    createCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['popup-form-mesto'],
                link: data['popup-form-link'],
            })
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    unLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }

    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
        .then((res) => {
            return this._checkResult(res)
        });
    }
}